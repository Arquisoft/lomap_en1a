import { Review } from "./Review";
import { Visibility } from "./Visibility";

export class Comment extends Review {
  private text: string;

  public constructor(
    id: string,
    text: string,
    place: string,
    owner: string,
    date: Date,
    visibility: Visibility
  ) {
    super(id, place, owner, date, visibility);
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }
}
