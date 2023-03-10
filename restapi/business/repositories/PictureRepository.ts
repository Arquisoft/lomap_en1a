import { Place } from "../../domain/Place";
import { User } from "../../domain/User";
import { Picture } from "../../domain/Picture";

export interface PictureRepository {

    add(picture: Picture, podId: string): boolean;
    findById(id: string): Picture;
    findByUser(user: string): Picture[];
    findByPlace(user: Place): Picture[];
}