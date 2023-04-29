import { Review } from "./Review";
import { Visibility } from "./Visibility";

export class Score extends Review {
  private score: number;

  public constructor(
    id: string,
    score: number,
    place: string,
    owner: string,
    date: Date,
    visibility: Visibility
  ) {
    super(id, place, owner, date, visibility);
    this.score = score;
  }

  public setScore(score: number) {
    this.score = score;
  }

  public getScore(): number {
    return this.score;
  }
}
