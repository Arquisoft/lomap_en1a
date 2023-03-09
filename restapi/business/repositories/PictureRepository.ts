import { PictureDto } from "../../domain/dtos/PictureDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Picture } from "../../domain/Picture";

export interface PictureRepository {

    add(user: UserDto, picture: PictureDto, place: PlaceDto): boolean;
    findById(id: string): Picture;
    findByUser(user: UserDto): Picture[];
    findByPlace(user: PlaceDto): Picture[];
}