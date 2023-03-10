import { ScoreRepository } from "../business/repositories/ScoreRepository";
import { Place } from "../domain/Place";
import { Score } from "../domain/Score";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";

export class ScoreRepositoryImpl implements ScoreRepository {

    private u: User = new User("1", "User 1", "podId");
    private scores: Score[] = [new Score("1", 10, new Place("1", "Place 1", this.u, PlaceVisibility.USER, 1, 1), this.u)];

    findById(id: string): Score {
        return this.scores[0];
    }

    findByUser(user: User): Score[] {
        return this.scores;
    }

    findByPlace(user: Place): Score[] {
        return this.scores;
    }

    add(score: Score): boolean {
        this.scores.push(score);
        return true;
    }
}