//Solid
import { getSessionFromStorage } from "@inrupt/solid-client-authn-node";
import {
  getSolidDataset,
  getThing,
  setThing,
  saveSolidDatasetAt,
  Thing,
  getStringNoLocale,
  getUrlAll,
  SolidDataset,
  createSolidDataset,
  buildThing,
  addIri,
  getUrl,
} from "@inrupt/solid-client";

//Configuration
import configuration from "../../configuration.json";
import { User } from "../../domain/User";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";
import { Assertion } from "../../Assertion";
import { PodSessionManager } from "./PodSessionManager";
import { Factory } from "../../Factory";
import { PodManager } from "./PodManager";

export class PodDataManager {
  private location = configuration.location;
  private profilePodZone = configuration.profilePodZone;

  public async fetchData(
    sessionId: string,
    resource: string,
    webId: string,
    zone: string
  ): Promise<SolidDataset> {
    Assertion.exists(sessionId, "The user must be logged in.");
    Assertion.exists(webId, "A web id must be provided.");

    let session = await getSessionFromStorage(sessionId);

    if (session == null) {
      throw new Error("The user must be logged in.");
    }

    let dataset = createSolidDataset();

    try {
      dataset = await getSolidDataset(
        webId + this.location + zone + "/" + resource,
        {
          fetch: session.fetch,
        }
      );
    } catch (e) {}

    return dataset;
  }

  public async writeData(
    sessionId: string,
    resource: string,
    thing: Thing,
    webId: string,
    zone: string
  ): Promise<boolean> {
    Assertion.exists(sessionId, "The user must be logged in.");
    Assertion.exists(webId, "A web id must be provided.");

    let session = await getSessionFromStorage(sessionId);

    if (session == null) {
      throw Error("The user must be logged in.");
    }

    let dataset = await this.fetchData(sessionId, resource, webId, zone);

    dataset = setThing(dataset, thing);

    await saveSolidDatasetAt(
      webId + this.location + zone + "/" + resource,
      dataset,
      { fetch: session.fetch }
    );

    return true;
  }
  public async getProfile(sessionId: string, webId: string) {
    let session = await getSessionFromStorage(sessionId);
    if (session == null) {
      throw new Error("Session could not be found.");
    }

    if (webId == undefined) {
      throw new Error("WebId cannot be undefined.");
    }
    let a = webId.split("profile")[0];
    let url = a + this.profilePodZone + "#me";
    let myDataset = await getSolidDataset(url, { fetch: session.fetch });
    const profile = getThing(
      myDataset,
      a + this.profilePodZone + "#me"
    ) as Thing;
    return profile;
  }

  public async getFriends(sessionId: string, webId: string): Promise<User[]> {
    let profile: Thing = await this.getProfile(sessionId, webId);

    let webIds: string[] = getUrlAll(profile, FOAF.knows);

    let friends: User[] = [];

    for (let f in webIds) {
      let user: User = await this.getUser(sessionId, webIds[f]);
      friends.push(user);
    }

    return friends;
  }

  public async getUser(sessionId: string, webId: string): Promise<User> {
    Assertion.exists(sessionId, "The user must be logged in.");
    Assertion.exists(webId, "A web id must be provided.");

    let profile = await this.getProfile(sessionId, webId);

    let name: string | null = getStringNoLocale(profile, FOAF.name);

    let photo: string | null = getUrl(profile, VCARD.hasPhoto);

    if (name == null) {
      throw new Error(
        "The name of the user whose web id is " + webId + ", is null"
      );
    }

    return new User(name, webId, photo);
  }

  async addFriend(sessionId: string, webId: string): Promise<boolean> {
    Assertion.exists(sessionId, "The user must be logged in.");
    Assertion.exists(webId, "A web id must be provided.");

    let session = await getSessionFromStorage(sessionId);

    if (session == null) {
      throw Error("The user must be logged in.");
    }

    let userWebId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let url = userWebId.split("profile")[0] + this.profilePodZone + "#me";
    let profileDataSet = await getSolidDataset(url, { fetch: session.fetch });

    let profile = getThing(profileDataSet, url) as Thing;

    profile = addIri(profile, FOAF.knows, webId);

    profileDataSet = setThing(profileDataSet, profile);

    await saveSolidDatasetAt(url, profileDataSet, {
      fetch: session.fetch,
    });

    PodManager.permissionManager.setupFriendPermissions(sessionId);

    return true;
  }
}
