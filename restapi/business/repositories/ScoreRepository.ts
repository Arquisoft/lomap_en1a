import { Place } from "../../domain/Place";
import { Score } from "../../domain/Score";
import { User } from "../../domain/User";

export interface ScoreRepository {

    add(score: Score, podId: string): Promise<boolean>;
    findById(id: string): Promise<Score>;
    findByUser(user: string): Promise<Score[]>;
    findByPlace(user: Place): Promise<Score[]>;
}