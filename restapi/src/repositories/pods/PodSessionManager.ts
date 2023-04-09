//Express
import { Response } from "express";

//Solid
import {
    getSessionFromStorage,
    Session
} from "@inrupt/solid-client-authn-node";

//Configuration
import configuration from '../../configuration.json';
import { Assertion } from "../../Assertion";

export class PodSessionManager {

    private appUrl = configuration.appUrl;
    private handle = configuration.handle;
    private port = configuration.port;
    private clientName = configuration.clientName;

    public async login(req: any, res: Response): Promise<void> {

        let host: string = process.env.host || "localhost";

        let provider = req.params.provider;
        Assertion.exists(provider, "A provider must be given.");
        provider = decodeURIComponent(provider);
        //provider = "https://inrupt.net";

        let redirect = req.params.redirect;
        //Assertion.exists(redirect, "A redirect url must be given.");
        //redirect = decodeURIComponent(redirect);
        redirect = "http://" + host + ":5000/api/login/success";

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

    public async successfulLogin(req: any, res: Response): Promise<any> {

        let host: string = process.env.host || "localhost";

        let solidSession = await getSessionFromStorage(req.session.solidSessionId);

        await solidSession?.handleIncomingRedirect(`http://${host}${this.port}${this.handle}${req.url}`);

        return res.redirect("http://" + host + ":3000/map");
    }

    public async logout(req: any, res: Response): Promise<any> {
        let solidSession = await getSessionFromStorage(req.session.solidSessionId);

        await solidSession?.logout();

        return "Logged out.";
    }

    public async getCurrentWebId(sessionId: string): Promise<string> {

        Assertion.exists(sessionId, "The user must be logged in.");

        let webId: string | undefined = (await getSessionFromStorage(sessionId))?.info.webId?.split("profile")[0];

        if (webId == undefined) {
            throw new Error("The user must be logged in.");
        }

        return webId;
    }

    public async isLoggedIn(sessionId: string): Promise<boolean> {
        let isLoggedIn = (await getSessionFromStorage(sessionId))?.info.isLoggedIn;

        if (isLoggedIn == undefined) {
            return false;
        }

        return isLoggedIn;
    }
}