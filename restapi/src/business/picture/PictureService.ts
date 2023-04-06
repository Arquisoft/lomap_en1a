import { PictureDto } from "../../domain/dtos/PictureDto";
import { Picture } from "../../domain/Picture";

export interface PictureService {

    add(sessionId: string, picture: PictureDto): Promise<boolean>;
    findOwn(sessionId: string, user: string): Promise<Picture[]>;
    findByPlace(sessionId: string, place: string): Promise<Picture[]>;
}