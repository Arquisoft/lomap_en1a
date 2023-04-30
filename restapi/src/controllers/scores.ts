//Dtos
import { ScoreDto } from "../domain/dtos/ScoreDto";

//Services
import { ScoreService } from "../business/score/ScoreService";

//Express
import { Response, Router } from "express";

//Assertion
import { Assertion } from "../Assertion";
import { Visibility } from "../domain/Visibility";

module.exports = function (api: Router, service: ScoreService) {
  //List all the scores for a given place
  api.get(
    "/score/list/:place",
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
        return res.status(400).send({ error: "Scores could not be fetched." });
      }
    }
  );

  //Add a score
  api.post("/score/add", async (req: any, res: Response): Promise<Response> => {
    try {
      Assertion.exists(req.body.score, "An score must be provided.");
      Assertion.exists(req.body.place, "A place must be provided.");
      Assertion.exists(req.body.visibility, "A visibility must be provided.");
      Assertion.exists(
        req.session.solidSessionId,
        "The user must be logged in."
      );

      let sessionId: string = <string>req.session.solidSessionId;
      let punt: number = <number>req.body.score;
      let placeId: string = <string>req.body.place;
      let visibility: Visibility = <Visibility>req.body.visibility;

      let score: ScoreDto = new ScoreDto();
      score.score = punt;
      score.place = placeId;
      score.visibility = visibility;

      return res.send(await service.add(sessionId, score));
    } catch (error) {
      console.log(error.message);
      return res.status(400).send({ error: "The score could not be added." });
    }
  });
};
