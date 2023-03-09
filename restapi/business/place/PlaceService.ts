import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { CommentDto } from "../../domain/dtos/CommentDto";
import { PictureDto } from "../../domain/dtos/PictureDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface PlaceService {

    getAllPlaces(user: UserDto): Place[];
    getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Place[];
    addScore(score: ScoreDto, user: UserDto): void;
    addComment(comment: CommentDto, user: UserDto): void;
    addPicture(picture: PictureDto, user: UserDto): void;
    addPlace(place: PlaceDto, user: UserDto): void;
}