//Dtos
import { ScoreDto } from "../domain/dtos/ScoreDto";

//Services
import { ScoreService } from '../business/score/ScoreService';

//Express
import { Response, Router } from 'express';

//Assertion
import { Assertion } from '../Assertion';
import { Visibility } from "../domain/Visibility";

module.exports = function (api: Router, service: ScoreService) {

    //List all the scores for a given place
    api.get("/score/list/:place",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.params.place, res);
            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var place: string = <string>req.params.place;

            return new Promise((resolve, reject) => {
                service.findByPlace(sessionId, place).then(b => {
                    //(b[0])
                    resolve(res.send(b));
                });
            });
        }
    );

    //Add a score
    api.post("/score/add",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.body.user, res);
            Assertion.exists(req.body.score, res);
            Assertion.exists(req.body.place, res);
            Assertion.exists(req.body.visibility, res);
            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var punt: number = <number>req.body.score;
            var placeId: string = <string>req.body.place;
            var visibility: Visibility = <Visibility>req.params.visibility;

            var score: ScoreDto = new ScoreDto();
            score.score = punt;
            score.place = placeId;
            score.visibility = visibility;

            return new Promise((resolve, reject) => {
                service.add(sessionId, score).then(b => {
                    resolve(res.send(b));
                });

            });
        }
    );
}