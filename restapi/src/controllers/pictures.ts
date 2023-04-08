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
            try {
                Assertion.exists(req.params.place, "A place must be provided.");
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");

                var sessionId: string = <string>req.session.solidSessionId;
                var place: string = <string>req.params.place;

                return res.send(await service.findByPlace(sessionId, place));
            }
            catch (error) {
                console.log(error.message);
                return res.send("Pictures could not be fetched.");
            }
        }
    );

    //Add a picture
    api.post("/picture/add",
        async (req: any, res: Response): Promise<Response> => {
            try {

                Assertion.exists(req.body.place, "A place must be provided.");
                Assertion.exists(req.body.picture, "A picture must be provided.");
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");
                Assertion.exists(req.body.visibility, "A visibility must be provided.");

                var sessionId: string = <string>req.session.solidSessionId;
                var url: string = <string>req.body.url;
                var placeId: string = <string>req.body.place;
                var visibility: Visibility = <Visibility>req.body.visibility;

                var picture: PictureDto = new PictureDto();
                picture.url = url;
                picture.place = placeId;
                picture.visibility = visibility;
                
                return res.send(await service.add(sessionId, picture));
            }
            catch (error) {
                console.log(error.message);
                return res.send("The picture could not be added.");
            }
        }
    );
}