import { PictureRepository } from "../business/repositories/PictureRepository";
import { PictureDto } from "../domain/dtos/PictureDto";
import { PlaceDto } from "../domain/dtos/PlaceDto";
import { UserDto } from "../domain/dtos/UserDto";
import { Picture } from "../domain/Picture";

export class PictureRepositoryImpl implements PictureRepository {
    findById(id: string): Picture {
        throw new Error("Method not implemented.");
    }
    findByUser(user: UserDto): Picture[] {
        throw new Error("Method not implemented.");
    }
    findByPlace(user: PlaceDto): Picture[] {
        throw new Error("Method not implemented.");
    }

    add(user: UserDto, picture: PictureDto, place: PlaceDto): boolean { return true; }
}