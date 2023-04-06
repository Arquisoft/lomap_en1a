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

export class PodDataManager {

    private location = configuration.location;
    private profilePodZone = configuration.profilePodZone;

    public async fetchData(sessionId: string, resource: string, webId: string, zone: string): Promise<SolidDataset> {

        let session = await getSessionFromStorage(sessionId);

        if (session == null) {
            throw new Error();
        }

        if (webId == undefined) {
            throw new Error();
        }

        webId = decodeURIComponent(webId);

        let dataset = createSolidDataset();

        try {
            dataset = await getSolidDataset(webId + this.location + zone + "/" + resource, {
                fetch: session.fetch
            });
        }
        catch (e) {
            console.log("Not found");
        }

        return dataset;
    }


    public async writeData(sessionId: string, resource: string, thing: Thing, webId: string, zone: string): Promise<boolean> {

        let session = await getSessionFromStorage(sessionId);

        if (session == null) {
            throw Error();
        }

        if (webId == undefined) {
            throw new Error();
        }

        webId = decodeURIComponent(webId);

        let dataset = await this.fetchData(sessionId, resource, webId, zone)

        dataset = setThing(dataset, thing);

        await saveSolidDatasetAt(webId + this.location + zone + "/" + resource, dataset, { fetch: session.fetch })

        return true;
    }

    public async getProfile(sessionId: string, webId: string) {

        let session = await getSessionFromStorage(sessionId);
        console.log(sessionId)
        if (session == null) {
            throw new Error();
        }

        if (webId == undefined) {
            throw new Error();
        }

        webId = decodeURIComponent(webId);

        let myDataset = await getSolidDataset(webId + this.profilePodZone + "#me", { fetch: session.fetch });

        const profile = getThing(myDataset, webId + this.profilePodZone + "#me") as Thing;

        return profile;
    }

    public async getFriends(sessionId: string, webId: string): Promise<User[]> {

        let profile: Thing = await this.getProfile(sessionId, webId);

        webId = decodeURIComponent(webId);

        let webIds: string[] = getUrlAll(profile, FOAF.knows);

        let friends: User[] = [];

        for (let f in webIds) {
            let user: User = await this.getUser(sessionId, webIds[f]);
            friends.push(user)
        }

        return friends;
    }

    public async getUser(sessionId: string, webId: string): Promise<User> {

        if (webId == undefined) {
            throw new Error();
        }

        let profile = await this.getProfile(sessionId, webId);

        let name: string | null = getStringNoLocale(profile, FOAF.name);

        if (name == null) {
            throw new Error();
        }

        webId = encodeURIComponent(webId)

        return new User(name, webId);
    }
}