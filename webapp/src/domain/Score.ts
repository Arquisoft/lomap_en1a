import { Review } from "./Review";

export class Score extends Review {

    public score: number;

    public constructor(id: string, score: number, place: string, owner: string) {
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