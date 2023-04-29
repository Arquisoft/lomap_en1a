import { PictureRepository } from "../business/repositories/PictureRepository";
import { PodManager } from "./pods/PodManager";
import { Picture } from "../domain/Picture";
import { SolidDataset } from "@inrupt/solid-client";
import { DatabaseConnection } from "./DatabaseConnection";
import { Visibility } from "../domain/Visibility";
import { Worker } from "./pararelism/Worker";
import { asyncParallelForEach } from "async-parallel-foreach";

export class PictureRepositoryImpl implements PictureRepository {
  async add(sessionId: string, picture: Picture): Promise<boolean> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    picture.setOwner(webId);

    if (picture.getVisibility() != Visibility.PRIVATE) {
      DatabaseConnection.add("pictures", {
        picture: picture.getId(),
        place: picture.getPlace(),
        webId: webId,
        visibility: picture.getVisibility(),
      });
    }

    return PodManager.dataManager.writeData(
      sessionId,
      "pictures",
      PodManager.rdfCreator.createPicture(picture),
      webId,
      picture.getVisibility().toLowerCase()
    );
  }

  async findByPlace(sessionId: string, place: string): Promise<Picture[]> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let friendsWebIds: string[] = (
      await PodManager.dataManager.getFriends(sessionId, webId)
    ).map((f) => f.getWebId());

    let workers: Worker[] = [];
    let aux: string[] = [];
    let pictures: Picture[] = [];
    let resource = "$webIdlomap/$visibility/pictures";

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

    let result = await DatabaseConnection.find("pictures", { place: place });

    await result.forEach((picture) => {
      if (
        !aux.includes(picture.webId + "/" + picture.visibility.toLowerCase())
      ) {
        let webId = picture.webId;
        let visibility = picture.visibility.toLowerCase();
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
      pictures = pictures.concat(
        PodManager.entityParser.parsePictures(w.getResult())
      );
    });

    return pictures;
  }
}
