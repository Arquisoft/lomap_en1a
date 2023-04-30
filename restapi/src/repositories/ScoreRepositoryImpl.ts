import { ScoreRepository } from "../business/repositories/ScoreRepository";
import { Score } from "../domain/Score";
import { PodManager } from "./pods/PodManager";
import { DatabaseConnection } from "./DatabaseConnection";
import { Visibility } from "../domain/Visibility";
import { Worker } from "./pararelism/Worker";
import { asyncParallelForEach } from "async-parallel-foreach";

export class ScoreRepositoryImpl implements ScoreRepository {
  async add(sessionId: string, score: Score): Promise<boolean> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    score.setOwner(webId);

    if (score.getVisibility() != Visibility.PRIVATE) {
      DatabaseConnection.add("scores", {
        score: score.getId(),
        place: score.getPlace(),
        webId: webId,
        visibility: score.getVisibility(),
      });
    }

    return PodManager.dataManager.writeData(
      sessionId,
      "scores",
      PodManager.rdfCreator.createScore(score),
      webId,
      score.getVisibility().toLowerCase()
    );
  }

  async findByPlace(sessionId: string, place: string): Promise<Score[]> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let friendsWebIds: string[] = (
      await PodManager.dataManager.getFriends(sessionId, webId)
    ).map((f) => f.getWebId());

    let workers: Worker[] = [];
    let aux: string[] = [];
    let scores: Score[] = [];
    let resource = "$webIdlomap/$visibility/scores";

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

    let result = await DatabaseConnection.find("scores", { place: place });

    await result.forEach((score) => {
      if (!aux.includes(score.webId + "/" + score.visibility.toLowerCase())) {
        let webId = score.webId;
        let visibility = score.visibility.toLowerCase();
        aux.push(webId + "/" + visibility);
        if (visibility == "public" || friendsWebIds.includes(webId)) {
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

    await asyncParallelForEach(workers, -1, async (w: Worker) => {
      await w.run();
    });

    workers.forEach((w) => {
      scores = scores.concat(
        PodManager.entityParser.parseScores(w.getResult())
      );
    });

    return scores;
  }
}
