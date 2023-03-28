import { Place } from "../../domain/Place";
import { Score } from "../../domain/Score";

export interface ScoreRepository {

    add(score: Score, podId: string): boolean;
    findById(id: string): Promise<Score>;
    findByUser(user: string): Promise<Score[]>;
    findByPlace(user: Place): Promise<Score[]>;
}