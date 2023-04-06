import { ScoreRepository } from "../business/repositories/ScoreRepository";
import { Score } from "../domain/Score";
import { PodManager } from "./pods/PodManager";
import { SolidDataset } from "@inrupt/solid-client";
import { DatabaseConnection } from "./DatabaseConnection";
import { Visibility } from "../domain/Visibility";

export class ScoreRepositoryImpl implements ScoreRepository {

    async add(sessionId: string, score: Score): Promise<boolean> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        score.setOwner(webId);

        if (score.getVisibility() != Visibility.PRIVATE) {
            DatabaseConnection.add("scores",
                {
                    score: score.getId(),
                    place: score.getPlace(),
                    webId: webId,
                    visibility: score.getVisibility()
                });
        }

        return PodManager.dataManager.writeData(sessionId, "scores", PodManager.rdfCreator.createScore(score), webId, score.getVisibility().toLowerCase());
    }

    async findOwn(sessionId: string, user: string): Promise<Score[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let dataset: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "comments", webId, "private");

        return PodManager.entityParser.parseScores(dataset);
    }

    async findByPlace(sessionId: string, place: string): Promise<Score[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let scores = (await this.findOwn(sessionId, webId)).filter(s => s.getPlace() === place);

        let friends: string[] = (await PodManager.dataManager.getFriends(sessionId, webId)).map(f => f.getWebId());

        let webIds: string[] = [];

        (await DatabaseConnection.find("comments", { place: place, visibility: Visibility.PUBLIC })).forEach(d => {
            if (!webIds.includes(d.webId)) {
                webIds.push(d.webId)
            }
        });

        for (let w in webIds) {
            let webID = webIds[w];
            PodManager.entityParser.parseScores(await PodManager.dataManager.fetchData(sessionId, "scores", webID, "public")).filter(s => s.getPlace() == place).forEach(s => { scores.push(s) });
        }

        webIds = [];

        (await DatabaseConnection.find("comments", { place: place, visibility: Visibility.FRIENDS })).forEach(d => {
            if (!webIds.includes(d.webId) && friends.includes(d.webId)) {
                webIds.push(d.webId)
            }
        });

        for (let w in webIds) {
            let webID = webIds[w];
            PodManager.entityParser.parseScores(await PodManager.dataManager.fetchData(sessionId, "scores", webID, "friends")).filter(s => s.getPlace() == place).forEach(s => { scores.push(s) });
        }

        return scores;
    }
}