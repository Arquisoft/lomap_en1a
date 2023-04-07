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
            try {
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");

                var sessionId: string = <string>req.session.solidSessionId;

                return res.send(await service.findPublic(sessionId));
            }
            catch (error) {
                console.log(error.message);
                return res.send("Places could not be fetched.");
            }
        }
    );

    //List all places shared with friends created by the given user
    api.get("/place/friends/list/:user",
        async (req: any, res: Response): Promise<Response> => {
            try {
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");
                Assertion.exists(req.params.user, "A user must be provided.");

                var sessionId: string = <string>req.session.solidSessionId;
                var user: string = <string>req.params.user;
                user = decodeURIComponent(user);

                return res.send(await service.findFriend(sessionId, user));
            }
            catch (error) {
                console.log(error.message);
                return res.send("Places could not be fetched.");
            }
        }
    );

    //List all private places created by the logged user
    api.get("/place/private/list",
        async (req: any, res: Response): Promise<Response> => {
            try {
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");

                var sessionId: string = <string>req.session.solidSessionId;

                return res.send(await service.findOwn(sessionId));
            }
            catch (error) {
                console.log(error.message);
                return res.send("Places could not be fetched.");
            }
        }
    );

    //List all places shared with the logged user
    api.get("/place/shared/list",
        async (req: any, res: Response): Promise<Response> => {
            try {
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");

                var sessionId: string = <string>req.session.solidSessionId;

                return res.send(await service.findSharedFriends(sessionId));
            }
            catch (error) {
                console.log(error.message);
                return res.send("Places could not be fetched.");
            }
        }
    );

    //Add a place
    api.post("/place/add",
        async (req: any, res: Response): Promise<Response> => {
            try {
                Assertion.exists(req.body.name, "A name must be provided.");
                Assertion.exists(req.body.visibility, "A visibility must be provided.");
                Assertion.exists(req.body.description, "A description must be provided.");
                Assertion.exists(req.body.latitude, "A latitude must be provided.");
                Assertion.exists(req.body.longitude, "A longitude must be provided.");
                Assertion.exists(req.session.solidSessionId, "The user must be logged in.");

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


                return res.send(await service.add(sessionId, place));
            }
            catch (error) {
                console.log(error.message);
                return res.send("The place could not be added.");
            }
        }
    );
}