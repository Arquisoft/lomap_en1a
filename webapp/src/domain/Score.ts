import { Review } from "./Review";
import { Visibility } from "./Visibility";

export class Score extends Review {

    public score: number;

    public constructor(id: string, score: number, place: string, owner: string, date: Date, visibility: Visibility) {
        super(id, place, owner, date, visibility);
        this.score = score;
    }


}