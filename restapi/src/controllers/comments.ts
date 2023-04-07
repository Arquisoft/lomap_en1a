//Dtos
import { CommentDto } from "../domain/dtos/CommentDto";

//Services
import { CommentService } from "../business/comment/CommentService";

//Express
import { Response, Router } from 'express';

//Assertion
import { Assertion } from '../Assertion';
import { Visibility } from "../domain/Visibility";

module.exports = function (api: Router, service: CommentService) {

    //List all the comments for a given place
    api.get("/comment/list/:place",
        async (req: any, res: Response): Promise<Response> => {
            try {
                Assertion.exists(req.params.place, "A place must be provided.");
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");

                var sessionId: string = <string>req.session.solidSessionId;
                var place: string = <string>req.params.place;

                return new Promise((resolve, reject) => {
                    service.findByPlace(sessionId, place).then(b => {
                        console.log(b[0])
                        resolve(res.send(b));
                    });
                });
            }
            catch (error) {
                console.log(error.message);
                return res.send("Comments could not be fetched.");
            }
        }
    );

    //Add a comment
    api.post("/comment/add",
        async (req: any, res: Response): Promise<Response> => {
            try {
                Assertion.exists(req.body.visibility, "A visibility must be provided.");
                Assertion.exists(req.body.comment, "A comment must be provided.");
                Assertion.exists(req.body.place, "A place must be provided.");
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");

                var sessionId: string = <string>req.session.solidSessionId;
                var text: string = <string>req.body.comment;
                var placeId: string = <string>req.body.place;
                var visibility: Visibility = <Visibility>req.params.visibility;

                var comment = new CommentDto();
                comment.place = placeId;
                comment.text = text;
                comment.visibility = visibility;

                return new Promise((resolve, reject) => {
                    service.add(sessionId, comment).then(b => {
                        resolve(res.send(b));
                    });
                });
            }
            catch (error) {
                console.log(error.message);
                return res.send("The comment could not be added.");
            }
        }
    );
}