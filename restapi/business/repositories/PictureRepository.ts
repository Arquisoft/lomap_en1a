import { Place } from "../../domain/Place";
import { Picture } from "../../domain/Picture";

export interface PictureRepository {

    add(picture: Picture, podId: string): boolean;
    findById(id: string): Promise<Picture>;
    findByUser(user: string): Promise<Picture[]>;
    findByPlace(user: Place): Promise<Picture[]>;
}