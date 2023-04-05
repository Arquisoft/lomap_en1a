//Express
import { Response } from "express";

//Solid
import {
    getSessionFromStorage,
    Session
} from "@inrupt/solid-client-authn-node";

//Configuration
import configuration from '../../configuration.json';

export class PodSessionManager {

    private appUrl = configuration.appUrl;
    private handle = configuration.handle;
    private port = configuration.port;
    private clientName = configuration.clientName;

    public async login(req: any, res: Response): Promise<void> {

        let provider = req.param.provider;
        provider = "https://inrupt.net";

        let redirect = req.param.redirect;
        redirect = "http://localhost:5000/api/login/success";

        const session = new Session();
        req.session.solidSessionId = session.info.sessionId;

        await session.login({
            redirectUrl: redirect,
            oidcIssuer: <string>provider,
            clientName: this.clientName,
            handleRedirect: (url: string) => {
                res.redirect(url)
            }
        });
    }

    public async successfulLogin(req: any, res: Response): Promise<Response> {
        let solidSession = await getSessionFromStorage(req.session.solidSessionId);

        await solidSession?.handleIncomingRedirect(`${this.appUrl}${this.port}${this.handle}${req.url}`);

        return res.send(solidSession?.info.webId);
    }

    public static async logout(req: any, res: Response): Promise<Response> {
        let solidSession = await getSessionFromStorage(req.session.solidSessionId);

        await solidSession?.logout();

        return res.send(solidSession?.info.webId);
    }

    public async getCurrentWebId(sessionId: string): Promise<string> {
        let webId: string | undefined = (await getSessionFromStorage(sessionId))?.info.webId?.split("profile")[0];

        if (webId == undefined) {
            webId = "";
        }

        return webId;
    }
}