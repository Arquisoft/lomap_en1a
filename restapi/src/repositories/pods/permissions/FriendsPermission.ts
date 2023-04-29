import { getSessionFromStorage } from "@inrupt/solid-client-authn-node";
import { Permission } from "./Permission";
import { access } from "@inrupt/solid-client";
import { PodManager } from "../PodManager";

export class FriendsPermission implements Permission {
  async setAcl(sessionId: string, url: string): Promise<void> {
    let session = await getSessionFromStorage(sessionId);

    if (session == undefined) {
      throw new Error("The user must be logged in.");
    }

    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let webIds: string[] = (
      await PodManager.dataManager.getFriends(sessionId, webId)
    ).map((f) => f.getWebId());

    webIds.forEach(async (webId) => {
      if (session == undefined) {
        throw new Error("The user must be logged in.");
      }

      await access.setAgentAccess(
        url,
        webId.split("/profile")[0] + "/profile/card#me",
        { read: true },
        { fetch: session.fetch }
      );
    });
  }
}
