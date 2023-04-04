import { ScoreDto } from "../../../../domain/dtos/ScoreDto";
import { Score } from "../../../../domain/Score";

export interface ScoreService {

    add(sessionId: string, picture: ScoreDto): Promise<boolean>;
    findOwn(sessionId: string, user: string): Promise<Score[]>;
    findByPlace(sessionId: string, place: string): Promise<Score[]>;
}