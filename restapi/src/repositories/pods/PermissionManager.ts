import {
  getSolidDatasetWithAcl,
  getLinkedResourceUrlAll,
  getFallbackAcl,
  createAclFromFallbackAcl,
  saveAclFor,
  access,
  getSolidDataset,
  createSolidDataset,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { Permission } from "./permissions/Permission";
import { PublicPermission } from "./permissions/PublicPermission";
import { FriendsPermission } from "./permissions/FriendsPermission";
import { PrivatePermission } from "./permissions/PrivatePermission";
import { getSessionFromStorage } from "@inrupt/solid-client-authn-node";
import { PodManager } from "./PodManager";

export class PermissionManager {
  private permissions: Map<string, Permission> = new Map<string, Permission>([
    ["public", new PublicPermission()],
    ["friends", new FriendsPermission()],
    ["private", new PrivatePermission()],
  ]);

  private pod: string = "$webIdlomap/$permission/$resource";
  private resources: string[] = ["places", "comments", "pictures", "scores"];

  public async updateAcl(
    sessionId: string,
    url: string,
    permission: string
  ): Promise<void> {
    try {
      let p = this.permissions.get(permission);

      await this.checkAcl(sessionId, url);

      await this.resetAcl(sessionId, url);

      if (p == null) {
        throw new Error("Invalid permission.");
      }

      await p.setAcl(sessionId, url);
    } catch (e) {}
  }

  private async resetAcl(sessionId: string, url: string) {
    try {
      let session = await getSessionFromStorage(sessionId);

      if (session == null) {
        throw new Error("The user must be logged in.");
      }

      let webId =
        (await PodManager.sessionManager.getCurrentWebId(sessionId)).split(
          "/profile"
        )[0] + "profile/card#me";

      let aux = await access.getAgentAccessAll(url, { fetch: session.fetch });

      for (let a in aux) {
        if (a !== webId) {
          await access.setAgentAccess(
            url,
            a,
            { read: false },
            { fetch: session.fetch }
          );
        }
      }

      await access.setPublicAccess(
        url,
        { read: false },
        { fetch: session.fetch }
      );
    } catch (e) {}
  }

  private async checkAcl(sessionId: string, url: string): Promise<void> {
    try {
      let session = await getSessionFromStorage(sessionId);

      if (session == null) {
        throw new Error("The user must be logged in.");
      }

      try {
        await getSolidDataset(url + ".acl", { fetch: session.fetch });
      } catch (e) {
        let dataset = await getSolidDatasetWithAcl(url, {
          fetch: session.fetch,
        });
        let linkedResources = getLinkedResourceUrlAll(dataset);
        let fallbackAcl = getFallbackAcl(dataset);

        if (fallbackAcl == null) {
          throw new Error("The resource does not have a fallback acl.");
        }

        let resourceInfo = {
          sourceIri: url,
          isRawData: false,
          linkedResources: linkedResources,
          aclUrl: url + ".acl",
        };

        let acl = createAclFromFallbackAcl({
          internal_resourceInfo: resourceInfo,
          internal_acl: {
            resourceAcl: null,
            fallbackAcl: fallbackAcl,
          },
        });

        await saveAclFor({ internal_resourceInfo: resourceInfo }, acl, {
          fetch: session.fetch,
        });
      }
    } catch (e) {}
  }

  public async setupPod(sessionId: string): Promise<void> {
    try {
      let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

      this.permissions.forEach(async (p, key) => {
        this.resources.forEach(async (r) => {
          let resource = this.pod
            .replace("$webId", webId)
            .replace("$permission", key)
            .replace("$resource", r);
          await this.checkDataset(sessionId, resource);
          this.checkAcl(sessionId, resource);
          this.updateAcl(sessionId, resource, key);
        });
      });
    } catch (e) {}
  }

  public async setupFriendPermissions(sessionId: string): Promise<void> {
    try {
      let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

      this.resources.forEach(async (r) => {
        let resource = this.pod
          .replace("$webId", webId)
          .replace("$permission", "friends")
          .replace("$resource", r);
        await this.checkDataset(sessionId, resource);
        this.checkAcl(sessionId, resource);
        this.updateAcl(sessionId, resource, "friends");
      });
    } catch (e) {}
  }

  private async checkDataset(sessionId: string, url: string): Promise<void> {
    try {
      let session = await getSessionFromStorage(sessionId);

      if (session == null) {
        throw new Error("The user must be logged in.");
      }

      let dataset = createSolidDataset();

      try {
        dataset = await getSolidDataset(url, {
          fetch: session.fetch,
        });
      } catch (e) {
        await saveSolidDatasetAt(url, dataset, { fetch: session.fetch });
      }
    } catch (e) {}
  }
}
