import { Place } from "./Place";
import { Review } from "./Review";
import { User } from "./User";

export class Score extends Review {

    private score: number;

    public constructor(id: string, score: number, place: Place, owner: User) {
        super(id, place, owner);
        this.score = score;
    }

    public setScore(score: number) {
        this.score = score;
    }

    public getScore(): number {
        return this.score;
    }
}