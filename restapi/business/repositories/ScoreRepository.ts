import { Place } from "../../domain/Place";
import { Score } from "../../domain/Score";
import { User } from "../../domain/User";

export interface ScoreRepository {

    add(score: Score, podId: string): boolean;
    findById(id: string): Score;
    findByUser(user: string): Score[];
    findByPlace(user: Place): Score[];
}