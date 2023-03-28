import { PictureRepository } from "../business/repositories/PictureRepository";
import { Place } from "../domain/Place";
import { Picture } from "../domain/Picture";

export class PictureRepositoryImpl implements PictureRepository {


    async findById(id: string): Promise<Picture> {
        throw new Error();
    }
    async findByUser(user: string): Promise<Picture[]> {
        throw new Error();
    }

    async findByPlace(user: Place): Promise<Picture[]> {
        throw new Error();
    }

    add(picture: Picture, podId: string): boolean {
        throw new Error();
    }
}