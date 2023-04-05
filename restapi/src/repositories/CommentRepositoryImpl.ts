import { SolidDataset, Thing } from "@inrupt/solid-client";
import { Comment } from "../../../domain/Comment";
import { CommentRepository } from "../business/repositories/CommentRepository";
import { PodManager } from "./pods/PodManager";
import { DatabaseConnection } from "./DatabaseConnection";
import { Visibility } from "../../../domain/Visibility";

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

        return PodManager.dataManager.writeData(sessionId, "comments", PodManager.rdfCreator.createComment(comment), webId, comment.getVisibility().toLowerCase());
    }

    async findOwn(sessionId: string, user: string): Promise<Comment[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let dataset: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "comments", webId, "private");

        return PodManager.entityParser.parseComments(dataset);
    }

    async findByPlace(sessionId: string, place: string): Promise<Comment[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let comments = (await this.findOwn(sessionId, webId)).filter(c => c.getPlace() === place);

        let friends: string[] = (await PodManager.dataManager.getFriends(sessionId, webId)).map(f => f.getWebId());

        let webIds: string[] = [];

        (await DatabaseConnection.find("comments", { place: place, visibility: Visibility.PUBLIC })).forEach(d => {
            if (!webIds.includes(d.webId)) {
                webIds.push(d.webId)
            }
        });

        for (let w in webIds) {
            let webID = webIds[w];
            PodManager.entityParser.parseComments(await PodManager.dataManager.fetchData(sessionId, "comments", webID, "public")).forEach(c => { comments.push(c) });
        }

        webIds = [];

        (await DatabaseConnection.find("comments", { place: place, visibility: Visibility.FRIENDS })).forEach(d => {
            if (!webIds.includes(d.webId) && friends.includes(d.webId)) {
                webIds.push(d.webId)
            }
        });

        for (let w in webIds) {
            let webID = webIds[w];
            PodManager.entityParser.parseComments(await PodManager.dataManager.fetchData(sessionId, "comments", webID, "friends")).forEach(c => { comments.push(c) });
        }

        return comments;
    }
}