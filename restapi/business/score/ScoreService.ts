import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Score } from "../../domain/Score";

export interface ScoreService {

    add(picture: ScoreDto, user: UserDto, place: PlaceDto): Promise<boolean>;
    findById(id: string): Promise<Score>;
    findByUser(user: UserDto): Promise<Score[]>;
    findByPlace(user: PlaceDto): Promise<Score[]>;
}