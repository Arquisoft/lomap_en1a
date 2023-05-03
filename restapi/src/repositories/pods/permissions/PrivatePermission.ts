import { getSessionFromStorage } from "@inrupt/solid-client-authn-node";
import { Permission } from "./Permission";
import { PodManager } from "../PodManager";
import { access } from "@inrupt/solid-client";

export class PrivatePermission implements Permission {
  async setAcl(sessionId: string, url: string): Promise<void> {
    try {
      let session = await getSessionFromStorage(sessionId);

      let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

      if (session == null) {
        throw new Error("The user must be logged in.");
      }

      await access.setAgentAccess(
        url,
        webId.split("/profile")[0] + "/profile/card#me",
        { read: true },
        { fetch: session.fetch }
      );
    } catch (e) {}
  }
}
