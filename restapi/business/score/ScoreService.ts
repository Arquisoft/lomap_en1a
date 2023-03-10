import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Score } from "../../domain/Score";

export interface ScoreService {

    add(picture: ScoreDto, user: UserDto, place: PlaceDto): boolean;
    findById(id: string): Score;
    findByUser(user: UserDto): Score[];
    findByPlace(user: PlaceDto): Score[];
}