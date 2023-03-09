import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface ScoreRepository {

    add(user: UserDto, score: ScoreDto): void;
}