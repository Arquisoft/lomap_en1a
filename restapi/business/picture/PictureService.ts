import { PictureDto } from "../../domain/dtos/PictureDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Picture } from "../../domain/Picture";

export interface PictureService {

    add(picture: PictureDto, user: UserDto, place: PlaceDto): Promise<boolean>;
    findById(id: string): Promise<Picture>;
    findByUser(user: UserDto): Promise<Picture[]>;
    findByPlace(place: PlaceDto): Promise<Picture[]>;
}