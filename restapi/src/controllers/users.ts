import { Request, Response, Router } from "express";
import { PodManager } from "../repositories/pods/PodManager";
import { UserService } from "../business/user/UserService";
import { Factory } from "../Factory";
import { User } from "../domain/User";
import { Assertion } from "../Assertion";

module.exports = function (api: Router) {

    //Log in into the pod
    api.get("/login/:provider/:redirect",
        async (req: Request, res: Response): Promise<void> => {
            Assertion.exists(req.params.provider, res);
            Assertion.exists(req.params.redirect, res);


            return PodManager.sessionManager.login(req, res);
        }
    );

    //Login redirect enpoint
    api.get("/login/success",
        async (req: Request, res: Response): Promise<any> => {
            return PodManager.sessionManager.successfulLogin(req, res);
        }
    );

    //Logout
    api.get("/logout",
        async (req: any, res: Response): Promise<any> => {

            return PodManager.sessionManager.logout(req, res);
        }
    );

    //Profile
    api.get("/profile/:webId", async (req: any, res: Response): Promise<Response> => {

        Assertion.exists(req.session.solidSessionId, res);
        Assertion.exists(req.params.webId, res);

        let sessionId: string = <string>req.session.solidSessionId;

        let webId = <string>req.params.webId;
        webId = decodeURIComponent(webId)

        let userService: UserService = Factory.services.getUserService();

        return res.send(await userService.getProfile(sessionId, webId));
    })

    //Profile
    api.get("/profile", async (req: any, res: Response): Promise<Response> => {
        Assertion.exists(req.session.solidSessionId, res);

        let sessionId: string = <string>req.session.solidSessionId;
        let webId: string = "OWN";

        let userService: UserService = Factory.services.getUserService();

        return res.send(await userService.getProfile(sessionId, webId));
    })

    api.get("/friends/:webId", async (req: any, res: Response): Promise<Response> => {

        Assertion.exists(req.session.solidSessionId, res);
        Assertion.exists(req.params.webId, res);

        let sessionId: string = <string>req.session.solidSessionId;
        let webId: string = <string>req.params.webId;
        webId = decodeURIComponent(webId)
        let userService: UserService = Factory.services.getUserService();

        return res.send(await userService.getFriends(sessionId, webId));
    })

    // api.get("/test/add",
    //     async (req: any, res: Response): Promise<any> => {

    //         var sessionId: string = <string>req.session.solidSessionId;
    //         let solidSession = await getSessionFromStorage(sessionId);

    //         let webId: string | undefined = solidSession?.info.webId?.split("profile")[0];

    //         if (webId == undefined) {
    //             throw new Error();
    //         }

    //         let place: PlaceDto = new PlaceDto();

    //         place.name = "Lugar";
    //         place.description = "Descripción";
    //         place.latitude = 0;
    //         place.longitude = 0;
    //         place.visibility = Visibility.FRIENDS;

    //         let service = new PlaceServiceImpl();

    //         let response = await service.add(sessionId, place);

    //         console.log(response)

    //         return res.send(response);
    //     }
    // );

    // api.get("/test/fetch",
    //     async (req: any, res: Response): Promise<any> => {

    //         var sessionId: string = <string>req.session.solidSessionId;
    //         let solidSession = await getSessionFromStorage(sessionId);

    //         let webId: string | undefined = solidSession?.info.webId?.split("profile")[0];

    //         if (webId == undefined) {
    //             throw new Error();
    //         }

    //         let service = new PlaceServiceImpl();

    //         let response = await service.findFriend(sessionId, webId);

    //         console.log(response)

    //         return res.send(response);
    //     }
    // );
}
