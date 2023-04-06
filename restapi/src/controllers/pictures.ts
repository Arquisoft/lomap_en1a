//Dtos
import { PictureDto } from "../domain/dtos/PictureDto";

//Services
import { PictureService } from '../business/picture/PictureService';

//Express
import { Response, Router } from 'express';

//Assertion
import { Assertion } from '../Assertion';
import { Visibility } from "../domain/Visibility";

module.exports = function (api: Router, service: PictureService) {

    //List all the pictures for a given place
    api.get("/picture/list/:place",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.params.place, res);
            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var place: string = <string>req.params.place;

            return new Promise((resolve, reject) => {
                service.findByPlace(sessionId, place).then(b => {
                    console.log(b[0])
                    resolve(res.send(b));
                });
            });
        }
    );

    //Add a picture
    api.post("/picture/add",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.body.place, res);
            Assertion.exists(req.body.picture, res);
            Assertion.exists(req.session.solidSessionId, res);
            Assertion.exists(req.body.visibility, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var url: string = <string>req.body.picture;
            var placeId: string = <string>req.body.place;
            var visibility: Visibility = <Visibility>req.params.visibility;

            var picture: PictureDto = new PictureDto();
            picture.url = url;
            picture.place = placeId;
            picture.visibility = visibility;

            return new Promise((resolve, reject) => {
                service.add(sessionId, picture).then(b => {
                    resolve(res.send(b));
                });

            });
        }
    );
}