import { ScoreRepository } from "../business/repositories/ScoreRepository";
import { Score } from "../../../domain/Score";
import { PodManager } from "./pods/PodManager";
import { SolidDataset, Thing } from "@inrupt/solid-client";
import { DatabaseConnection } from "./DatabaseConnection";

export class ScoreRepositoryImpl implements ScoreRepository {

    async add(sessionId: string, score: Score): Promise<boolean> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        score.setOwner(webId);

        DatabaseConnection.add("scores",
            {
                score: score.getId(),
                place: score.getPlace(),
                webId: webId
            });

        return PodManager.dataManager.writeData(sessionId, "scores", PodManager.ldJsonCreator.createScore(score), webId, score.getVisibility().toLowerCase());
    }

    async findOwn(sessionId: string, user: string): Promise<Score[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let dataset: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "comments", webId, "private");

        return PodManager.entityParser.parseScores(dataset, webId + "lomap/private/scores");
    }

    async findByPlace(sessionId: string, place: string): Promise<Score[]> {
        throw new Error("Method not implemented.");
    }
}