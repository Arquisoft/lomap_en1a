import { SolidDataset, Thing } from "@inrupt/solid-client";
import { Comment } from "../../../domain/Comment";
import { CommentRepository } from "../business/repositories/CommentRepository";
import { PodManager } from "./pods/PodManager";
import { DatabaseConnection } from "./DatabaseConnection";

export class CommentRepositoryImpl implements CommentRepository {

    async add(sessionId: string, comment: Comment): Promise<boolean> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        comment.setOwner(webId);

        DatabaseConnection.add("comments",
            {
                comment: comment.getId(),
                place: comment.getPlace(),
                webId: webId
            });

        return PodManager.dataManager.writeData(sessionId, "comments", PodManager.ldJsonCreator.createComment(comment), webId, comment.getVisibility().toLowerCase());
    }

    async findOwn(sessionId: string, user: string): Promise<Comment[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let dataset: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "comments", webId, "private");

        return PodManager.entityParser.parseComments(dataset, webId + "lomap/private/comments");
    }

    async findByPlace(sessionId: string, place: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
}