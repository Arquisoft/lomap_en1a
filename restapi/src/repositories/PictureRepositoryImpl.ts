import { PictureRepository } from "../business/repositories/PictureRepository";
import { PodManager } from "./pods/PodManager";
import { Place } from "../../../domain/Place";
import { Picture } from "../../../domain/Picture";
import { SolidDataset, Thing } from "@inrupt/solid-client";
import { DatabaseConnection } from "./DatabaseConnection";

export class PictureRepositoryImpl implements PictureRepository {


    async add(sessionId: string, picture: Picture): Promise<boolean> {
        let c = PodManager.ldJsonCreator.createPicture(picture);

        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        picture.setOwner(webId);

        DatabaseConnection.add("pictures",
            {
                picture: picture.getId(),
                place: picture.getPlace(),
                webId: webId
            });

        return PodManager.dataManager.writeData(sessionId, "pictures", PodManager.ldJsonCreator.createPicture(picture), webId, picture.getVisibility().toLowerCase());
    }

    async findOwn(sessionId: string, user: string): Promise<Picture[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let dataset: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "comments", webId, "private");

        return PodManager.entityParser.parsePictures(dataset, webId + "lomap/private/pictures");
    }

    async findByPlace(sessionId: string, place: string): Promise<Picture[]> {
        throw new Error("Method not implemented.");
    }
}