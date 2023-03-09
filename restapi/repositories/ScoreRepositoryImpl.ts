import { ScoreRepository } from "../business/repositories/ScoreRepository";
import { PlaceDto } from "../domain/dtos/PlaceDto";
import { ScoreDto } from "../domain/dtos/ScoreDto";
import { UserDto } from "../domain/dtos/UserDto";
import { Score } from "../domain/Score";

export class ScoreRepositoryImpl implements ScoreRepository {

    findById(id: string): Score {
        throw new Error("Method not implemented.");
    }
    findByUser(user: UserDto): Score[] {
        throw new Error("Method not implemented.");
    }
    findByPlace(user: PlaceDto): Score[] {
        throw new Error("Method not implemented.");
    }

    add(user: UserDto, score: ScoreDto, place: PlaceDto): boolean { return true; }
}