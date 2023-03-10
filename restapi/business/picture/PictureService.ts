import { PictureDto } from "../../domain/dtos/PictureDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Picture } from "../../domain/Picture";

export interface PictureService {

    add(picture: PictureDto, user: UserDto, place: PlaceDto): boolean;
    findById(id: string): Picture;
    findByUser(user: UserDto): Picture[];
    findByPlace(place: PlaceDto): Picture[];
}