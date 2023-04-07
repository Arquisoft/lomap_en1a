import { SolidDataset } from "@inrupt/solid-client";
import { Comment } from "../domain/Comment";
import { CommentRepository } from "../business/repositories/CommentRepository";
import { PodManager } from "./pods/PodManager";
import { DatabaseConnection } from "./DatabaseConnection";
import { Visibility } from "../domain/Visibility";

export class CommentRepositoryImpl implements CommentRepository {

    async add(sessionId: string, comment: Comment): Promise<boolean> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        comment.setOwner(webId);

        if (comment.getVisibility() != Visibility.PRIVATE) {
            DatabaseConnection.add("comments",
                {
                    comment: comment.getId(),
                    place: comment.getPlace(),
                    webId: webId,
                    visibility: comment.getVisibility()
                });
        }

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
        
    
        await (await DatabaseConnection.find("comments", { place: place, visibility: Visibility.PUBLIC })).forEach(d => {
        
            console.log(!webIds.includes(d.webId))
            if (!webIds.includes(d.webId)) {
                console.log(webIds.push(d.webId))
                console.log(webIds)
            }
        });
        
        for (let w in webIds) {
            
            let webID = webIds[w];
            PodManager.entityParser.parseComments(await PodManager.dataManager.fetchData(sessionId, "comments", webID, "public")).filter(c => c.getPlace() == place).forEach(c => { comments.push(c) });
        }

        webIds = [];

        await(await DatabaseConnection.find("comments", { place: place, visibility: Visibility.FRIENDS })).forEach(d => {
            if (!webIds.includes(d.webId) && friends.includes(d.webId)) {
                webIds.push(d.webId)
            }
        });

        for (let w in webIds) {
            let webID = webIds[w];
            PodManager.entityParser.parseComments(await PodManager.dataManager.fetchData(sessionId, "comments", webID, "friends")).filter(c => c.getPlace() == place).forEach(c => { comments.push(c) });
        }

        return comments;
    }
}