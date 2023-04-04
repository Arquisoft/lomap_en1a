import { Request, Response, Router } from "express";
import { PodManager } from "../repositories/pods/PodManager";
import { getSessionFromStorage } from "@inrupt/solid-client-authn-node";
import { Place } from "../../../domain/Place";
import { Visibility } from "../../../domain/Visibility";
import { PlaceServiceImpl } from "../business/place/PlaceServiceImpl";
import { PlaceDto } from "../../../domain/dtos/PlaceDto";
import { UserServiceImpl } from "../business/user/UserServiceImpl";
import { UserService } from "../business/user/UserService";
import { Factory } from "../Factory";
import { User } from "../../../domain/User";
import { Assertion } from "../Assertion";

module.exports = function (api: Router) {

    api.get("/login",
        async (req: Request, res: Response): Promise<void> => {

            return PodManager.sessionManager.login(req, res);
        }
    );

    api.get("/login/success",
        async (req: Request, res: Response): Promise<any> => {

            return PodManager.sessionManager.successfulLogin(req, res);
        }
    );

    api.get("/profile:", async (req: any, res: Response): Promise<User> => {

        Assertion.exists(req.session.solidSessionId, res);
        Assertion.exists(req.params.webId, res);

        var sessionId: string = <string>req.session.solidSessionId;
        var webId: string = <string>req.params.webId;

        let userService: UserService = Factory.services.getUserService();

        return userService.getProfile(sessionId, webId);
    })

    api.get("/test",
        async (req: any, res: Response): Promise<any> => {

            var sessionId: string = <string>req.session.solidSessionId;
            let solidSession = await getSessionFromStorage(sessionId);

            let webId: string | undefined = solidSession?.info.webId?.split("profile")[0];

            let place: PlaceDto = new PlaceDto();
            place.name = "Sitio";
            place.description = "Descripción";
            place.latitude = 0;
            place.longitude = 0;
            place.visibility = Visibility.PRIVATE;

            if (webId == undefined) {
                throw new Error();
            }

            let service = new PlaceServiceImpl();

            let response = await service.add(sessionId, place);

            console.log(response)

            return res.send(response);
        }
    );
}
