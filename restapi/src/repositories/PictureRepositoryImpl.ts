import { PictureRepository } from "../business/repositories/PictureRepository";
import { PodManager } from "./pods/PodManager";
import { Picture } from "../domain/Picture";
import { SolidDataset } from "@inrupt/solid-client";
import { DatabaseConnection } from "./DatabaseConnection";
import { Visibility } from "../domain/Visibility";

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

  async findOwn(sessionId: string, user: string): Promise<Picture[]> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let pictures: Picture[] = [];

    let dataset: SolidDataset = await PodManager.dataManager.fetchData(
      sessionId,
      "pictures",
      webId,
      "private"
    );

    pictures = PodManager.entityParser.parsePictures(dataset);

    dataset = await PodManager.dataManager.fetchData(
      sessionId,
      "pictures",
      webId,
      "friends"
    );

    pictures = pictures.concat(PodManager.entityParser.parsePictures(dataset));

    return pictures;
  }

  async findByPlace(sessionId: string, place: string): Promise<Picture[]> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let pictures = (await this.findOwn(sessionId, webId)).filter(
      (c) => c.getPlace() === place
    );

    let friends: string[] = (
      await PodManager.dataManager.getFriends(sessionId, webId)
    ).map((f) => f.getWebId());

    let webIds: string[] = [];

    await (
      await DatabaseConnection.find("pictures", {
        place: place,
        visibility: Visibility.PUBLIC,
      })
    ).forEach((d) => {
      if (!webIds.includes(d.webId)) {
        webIds.push(d.webId);
      }
    });

    for (let w in webIds) {
      let webID = webIds[w];
      PodManager.entityParser
        .parsePictures(
          await PodManager.dataManager.fetchData(
            sessionId,
            "pictures",
            webID,
            "public"
          )
        )
        .filter((p) => p.getPlace() == place)
        .forEach((p) => {
          pictures.push(p);
        });
    }

    webIds = [];

    await (
      await DatabaseConnection.find("pictures", {
        place: place,
        visibility: Visibility.FRIENDS,
      })
    ).forEach((d) => {
      if (!webIds.includes(d.webId) && friends.includes(d.webId)) {
        webIds.push(d.webId);
      }
    });

    for (let w in webIds) {
      let webID = webIds[w];
      PodManager.entityParser
        .parsePictures(
          await PodManager.dataManager.fetchData(
            sessionId,
            "pictures",
            webID,
            "friends"
          )
        )
        .filter((p) => p.getPlace() == place)
        .forEach((p) => {
          pictures.push(p);
        });
    }

    return pictures;
  }
}
