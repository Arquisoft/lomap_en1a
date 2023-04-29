import { BaseEntity } from "./BaseEntity";
import { Visibility } from "./Visibility";

export abstract class Review extends BaseEntity {
  private place: string;
  private owner: string;
  private date: Date;
  private visibility: Visibility;

  public constructor(
    id: string,
    place: string,
    owner: string,
    date: Date,
    visibility: Visibility
  ) {
    super(id);
    this.place = place;
    this.date = date;
    this.owner = owner;
    this.visibility = visibility;
  }
  public getPlace(): string {
    return this.place;
  }

  public getOwner(): string {
    return this.owner;
  }

  public setOwner(owner: string): void {
    this.owner = owner;
  }

  public getDate(): Date {
    return this.date;
  }

  public getVisibility(): Visibility {
    return this.visibility;
  }
}
