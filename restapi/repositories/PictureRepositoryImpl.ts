import { PictureRepository } from "../business/repositories/PictureRepository";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { Picture } from "../domain/Picture";
import { PlaceVisibility } from "../domain/Visibility";

export class PictureRepositoryImpl implements PictureRepository {

    private pictures: Picture[] = [new Picture("1", "url", new Place("1", "Place 1", "podId", PlaceVisibility.USER, 1, 1), "podId")];

    async findById(id: string): Promise<Picture> {
        return this.pictures[0];
    }
    async findByUser(user: string): Promise<Picture[]> {
        return this.pictures;
    }

    async findByPlace(user: Place): Promise<Picture[]> {
        return this.pictures;
    }

    add(picture: Picture, podId: string): boolean {
        this.pictures.push(picture);
        return true;
    }
}