//Entities
import { Visibility } from "../domain/Visibility";

//Dtos
import { PlaceDto } from "../domain/dtos/PlaceDto";

//Services
import { PlaceService } from "../business/place/PlaceService";

//Express
import { Response, Router } from 'express';

//Assertion
import { Assertion } from '../Assertion';



module.exports = function (api: Router, service: PlaceService) {



    //List all public places
    api.get("/place/public/list",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.session.solidSessionId, res);
            //console.log(req.session.solidSessionId)

            var sessionId: string = <string>req.session.solidSessionId;

            return new Promise((resolve, reject) => {
                service.findPublic(sessionId).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );

    //List all places shared with friends created by the given user
    api.get("/place/friends/list/:user",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.session.solidSessionId, res);
            Assertion.exists(req.params.user, res);

            var sessionId: string = <string>req.session.solidSessionId;
            var user: string = <string>req.params.user;
            user = decodeURIComponent(user)
            return new Promise((resolve, reject) => {
                service.findFriend(sessionId, user).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );

    //List all private places created by the logged user
    api.get("/place/private/list",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;

            return new Promise((resolve, reject) => {
                service.findOwn(sessionId).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );

    //List all places shared with the logged user
    api.get("/place/shared/list",
        async (req: any, res: Response): Promise<Response> => {

            Assertion.exists(req.session.solidSessionId, res);

            var sessionId: string = <string>req.session.solidSessionId;

            return new Promise((resolve, reject) => {
                service.findSharedFriends(sessionId).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );

    //Add a place
    api.post("/place/add",
        async (req: any, res: Response): Promise<Response> => {

            //Assertion.exists(req.body.name, res);
            //Assertion.exists(req.body.visibility, res);
            //Assertion.exists(req.body.description, res);
            //Assertion.exists(req.body.latitude, res);
            //Assertion.exists(req.body.longitude, res);
            //Assertion.exists(req.session.solidSessionId, res);

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
            place.description = "description";
            console.log(place.name)
            console.log(place.latitude)
            console.log(place.longitude)
            console.log(place.visibility)
            console.log(place.description)



            return new Promise((resolve, reject) => {
                service.add(sessionId, place).then(b => {
                    resolve(res.send(b));
                });
            });
        }
    );
}