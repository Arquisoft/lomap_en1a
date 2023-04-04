//Entities
import { Visibility } from "../../../domain/Visibility";

//Dtos
import { UserDto } from "../../../domain/dtos/UserDto";
import { PlaceDto } from "../../../domain/dtos/PlaceDto";

//Services
import { PlaceService } from "../business/place/PlaceService";

//Express
import { Request, Response, Router } from 'express';

//Assertion
import { Assertion } from '../Assertion';

module.exports = function (api: Router, service: PlaceService) {

    //List public places
    api.get("/place/public/list",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.params.user, res);
            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var user: string = <string>req.params.user;

            return new Promise((resolve, reject) => {
                service.findPublic(sessionId, user).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );

    //List public places
    api.get("/place/friends/list",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.params.user, res);
            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var user: string = <string>req.params.user;

            return new Promise((resolve, reject) => {
                service.findFriend(sessionId, user).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );

    //List public places
    api.get("/place/private/list",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.params.user, res);
            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var user: string = <string>req.params.user;

            return new Promise((resolve, reject) => {
                service.findOwn(sessionId, user).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );

    //Add a place
    api.post("/place/add",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.body.name, res);
            Assertion.exists(req.body.visibility, res);
            Assertion.exists(req.body.latitude, res);
            Assertion.exists(req.body.longitude, res);
            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var name: string = <string>req.body.name;
            var description: string = <string>req.body.description;
            var visibility: Visibility = <Visibility>req.body.visibility;
            var latitude: number = <number>req.body.latitude;
            var longitude: number = <number>req.body.longitude;

            var place: PlaceDto = new PlaceDto();
            place.name = name;
            place.latitude = latitude;
            place.longitude = longitude;
            place.visibility = visibility;
            place.description = description;


            return new Promise((resolve, reject) => {
                service.add(sessionId, place).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );
}