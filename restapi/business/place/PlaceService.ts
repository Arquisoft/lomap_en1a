import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { CommentDto } from "../../domain/dtos/CommentDto";
import { PictureDto } from "../../domain/dtos/PictureDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface PlaceService {

    getAllPlaces(user: UserDto): Promise<Place[]>;
    getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Promise<Place[]>;
    add(place: PlaceDto, user: UserDto): void;
}