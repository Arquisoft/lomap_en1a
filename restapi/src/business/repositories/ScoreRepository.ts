import { Place } from "../../../../domain/Place";
import { Score } from "../../../../domain/Score";
import { User } from "../../../../domain/User";

export interface ScoreRepository {

    add(sessionId: string, score: Score): Promise<boolean>;
    findOwn(sessionId: string, user: string): Promise<Score[]>;
    findByPlace(sessionId: string, place: string): Promise<Score[]>;
}