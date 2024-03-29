//Dtos
import { CommentDto } from "../domain/dtos/CommentDto";

//Services
import { CommentService } from "../business/comment/CommentService";

//Express
import { Response, Router } from "express";

//Assertion
import { Assertion } from "../Assertion";
import { Visibility } from "../domain/Visibility";

module.exports = function (api: Router, service: CommentService) {
  //List all the comments for a given place
  api.get(
    "/comment/list/:place",
    async (req: any, res: Response): Promise<Response> => {
      try {
        Assertion.exists(req.params.place, "A place must be provided.");
        Assertion.exists(
          req.session.solidSessionId,
          "The user must be logged in."
        );

        let sessionId: string = <string>req.session.solidSessionId;
        let place: string = <string>req.params.place;

        return res.send(await service.findByPlace(sessionId, place));
      } catch (error) {
        console.log(error.message);
        return res
          .status(400)
          .send({ error: "Comments could not be fetched." });
      }
    }
  );

  //Add a comment
  api.post(
    "/comment/add",
    async (req: any, res: Response): Promise<Response> => {
      try {
        Assertion.exists(req.body.visibility, "A visibility must be provided.");
        Assertion.exists(req.body.comment, "A comment must be provided.");
        Assertion.exists(req.body.place, "A place must be provided.");
        Assertion.exists(
          req.session.solidSessionId,
          "The user must be logged in."
        );

        let sessionId: string = <string>req.session.solidSessionId;
        let text: string = <string>req.body.comment;
        let placeId: string = <string>req.body.place;
        let visibility: Visibility = <Visibility>req.body.visibility;

        let comment = new CommentDto();
        comment.place = placeId;
        comment.text = text;
        comment.visibility = visibility;

        return res.send(await service.add(sessionId, comment));
      } catch (error) {
        console.log(error.message);
        return res
          .status(400)
          .send({ error: "The comment could not be added." });
      }
    }
  );
};
