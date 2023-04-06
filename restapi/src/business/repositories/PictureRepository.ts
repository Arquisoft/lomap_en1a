import { Picture } from "../../domain/Picture";

export interface PictureRepository {

    add(sessionId: string, picture: Picture): Promise<boolean>;
    findOwn(sessionId: string, user: string): Promise<Picture[]>;
    findByPlace(sessionId: string, place: string): Promise<Picture[]>;
}