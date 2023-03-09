import { PictureDto } from "../../domain/dtos/PictureDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface PictureRepository {

    add(user: UserDto, picture: PictureDto): void;
}