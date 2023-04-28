import { getSessionFromStorage } from "@inrupt/solid-client-authn-node";
import { Permission } from "./Permission";
import { access } from "@inrupt/solid-client";

export class PublicPermission implements Permission {

    async setAcl(sessionId: string, url: string): Promise<void> {
        let session = await getSessionFromStorage(sessionId);

        if (session == null) {
            throw new Error("The user must be logged in.");
        }

        await access.setPublicAccess(
            url,
            { read: true },
            { fetch: session.fetch }
        );
    }
}