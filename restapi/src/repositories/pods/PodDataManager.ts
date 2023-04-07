//Solid
import {
    getSessionFromStorage
} from "@inrupt/solid-client-authn-node";
import {
    getSolidDataset,
    getThing,
    setThing,
    saveSolidDatasetAt,
    Thing,
    getStringNoLocale,
    getUrlAll,
    SolidDataset,
    createSolidDataset
} from "@inrupt/solid-client";

//Configuration
import configuration from '../../configuration.json';
import { User } from "../../domain/User";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { Assertion } from "../../Assertion";

export class PodDataManager {

    private location = configuration.location;
    private profilePodZone = configuration.profilePodZone;

    public async fetchData(sessionId: string, resource: string, webId: string, zone: string): Promise<SolidDataset> {

        Assertion.exists(sessionId, "The user must be logged in.");
        Assertion.exists(webId, "A web id must be provided.");

        let session = await getSessionFromStorage(sessionId);
        if (session == null) {
            throw new Error("The user must be logged in.");
        }

        if (webId == undefined) {
            throw new Error();
        }

        let dataset = createSolidDataset();

        try {
            dataset = await getSolidDataset(webId + this.location + zone + "/" + resource, {
                fetch: session.fetch
            });
        }
        catch (e) {
            //console.log("Not found");
        }

        return dataset;
    }


    public async writeData(sessionId: string, resource: string, thing: Thing, webId: string, zone: string): Promise<boolean> {

        Assertion.exists(sessionId, "The user must be logged in.");
        Assertion.exists(webId, "A web id must be provided.");

        let session = await getSessionFromStorage(sessionId);

        if (session == null) {
            throw Error("The user must be logged in.");
        }

        if (webId == undefined) {
            throw new Error();
        }

        let dataset = await this.fetchData(sessionId, resource, webId, zone)

        dataset = setThing(dataset, thing);

        await saveSolidDatasetAt(webId + this.location + zone + "/" + resource, dataset, { fetch: session.fetch })

        return true;
    }

    public async getProfile(sessionId: string, webId: string) {
        let session = await getSessionFromStorage(sessionId);
        //console.log(sessionId)
        if (session == null) {
            throw new Error();
        }

        if (webId == undefined) {
            throw new Error();
        }
        var a = (webId.split("profile")[0])
        let url = a + this.profilePodZone + "#me"
        let myDataset = await getSolidDataset(url, { fetch: session.fetch });

        const profile = getThing(myDataset, a + this.profilePodZone + "#me") as Thing;

        return profile;
    }

    public async getFriends(sessionId: string, webId: string): Promise<User[]> {


        let profile: Thing = await this.getProfile(sessionId, webId);

        let webIds: string[] = getUrlAll(profile, FOAF.knows);

        let friends: User[] = [];

        for (let f in webIds) {

            let user: User = await this.getUser(sessionId, webIds[f]);

            friends.push(user)
        }

        return friends;
    }

    public async getUser(sessionId: string, webId: string): Promise<User> {

        Assertion.exists(sessionId, "The user must be logged in.");
        Assertion.exists(webId, "A web id must be provided.");

        let profile = await this.getProfile(sessionId, webId);

        let name: string | null = getStringNoLocale(profile, FOAF.name);

        if (name == null) {
            throw new Error("The name of the user whose web id is " + webId + ", is null");
        }

        return new User(name, webId);
    }
}