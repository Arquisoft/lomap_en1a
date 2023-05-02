import { Comment } from "../domain/Comment";
import { CommentRepository } from "../business/repositories/CommentRepository";
import { PodManager } from "./pods/PodManager";
import { DatabaseConnection } from "./DatabaseConnection";
import { Visibility } from "../domain/Visibility";
import { Worker } from "./pararelism/Worker";
import { asyncParallelForEach } from "async-parallel-foreach";

/**
 * Implements the CommentRepository interface.
 */
export class CommentRepositoryImpl implements CommentRepository {
  async add(sessionId: string, comment: Comment): Promise<boolean> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    comment.setOwner(webId);

    if (comment.getVisibility() != Visibility.PRIVATE) {
      DatabaseConnection.add("comments", {
        comment: comment.getId(),
        place: comment.getPlace(),
        webId: webId,
        visibility: comment.getVisibility(),
      });
    }

    return PodManager.dataManager.writeData(
      sessionId,
      "comments",
      PodManager.rdfCreator.createComment(comment),
      webId,
      comment.getVisibility().toLowerCase()
    );
  }

  async findByPlace(sessionId: string, place: string): Promise<Comment[]> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let userName = (
      await PodManager.dataManager.getUser(sessionId, webId)
    ).getUsername();

    let friendsWebIds: string[] = (
      await PodManager.dataManager.getFriends(sessionId, webId)
    ).map((f) => f.getWebId());

    let publicWebIds: string[] = [];
    let workers: Worker[] = [];
    let aux: string[] = [];
    let users: string[] = [];
    let comments: Comment[] = [];
    let resource = "$webIdlomap/$visibility/comments";

    workers.push(
      new Worker(
        sessionId,
        resource.replace("$webId", webId).replace("$visibility", "private")
      )
    );

    workers.push(
      new Worker(
        sessionId,
        resource.replace("$webId", webId).replace("$visibility", "friends")
      )
    );

    let result = await DatabaseConnection.find("comments", { place: place });

    await result.forEach((comment) => {
      if (
        !aux.includes(comment.webId + "/" + comment.visibility.toLowerCase())
      ) {
        let webId = comment.webId;
        let visibility = comment.visibility.toLowerCase();
        aux.push(webId + "/" + visibility);
        if (visibility == "public" || friendsWebIds.includes(webId)) {
          if (!publicWebIds.includes(webId)) {
            publicWebIds.push(webId);
          }
          workers.push(
            new Worker(
              sessionId,
              resource
                .replace("$webId", webId)
                .replace("$visibility", visibility)
            )
          );
        }
      }
    });

    if (publicWebIds.length > 0) {
      await asyncParallelForEach(publicWebIds, -1, async (w: string) => {
        users.push(
          (await PodManager.dataManager.getUser(sessionId, w)).getUsername()
        );
      });
    }

    await asyncParallelForEach(workers, -1, async (w: Worker) => {
      await w.run();
    });

    workers.forEach((w) => {
      comments = comments.concat(
        PodManager.entityParser.parseComments(w.getResult())
      );
    });

    comments.forEach((c: Comment) => {
      let i: number = publicWebIds.indexOf(c.getOwner());
      let owner: string = userName;
      if (i != -1) {
        owner = users[i];
      }
      c.setOwner(owner);
    });

    comments.filter((c) => c.getPlace() == place);

    return comments;
  }
}
