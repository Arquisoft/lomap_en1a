import { Review } from "./Review";
import { Visibility } from "./Visibility";

export class Picture extends Review {
  private url: string;

  public constructor(
    id: string,
    url: string,
    place: string,
    owner: string,
    date: Date,
    visibility: Visibility
  ) {
    super(id, place, owner, date, visibility);
    this.url = url;
  }

  public getUrl(): string {
    return this.url;
  }
}
