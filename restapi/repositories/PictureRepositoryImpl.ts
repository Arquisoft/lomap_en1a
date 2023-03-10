import { PictureRepository } from "../business/repositories/PictureRepository";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { Picture } from "../domain/Picture";
import { PlaceVisibility } from "../domain/Visibility";

export class PictureRepositoryImpl implements PictureRepository {

    private pictures: Picture[] = [new Picture("1", "url", new Place("1", "Place 1", "podId", PlaceVisibility.USER, 1, 1), "podId")];

    findById(id: string): Picture {
        return this.pictures[0];
    }
    findByUser(user: string): Picture[] {
        return this.pictures;
    }

    findByPlace(user: Place): Picture[] {
        return this.pictures;
    }

    add(picture: Picture): boolean {
        this.pictures.push(picture);
        return true;
    }
}