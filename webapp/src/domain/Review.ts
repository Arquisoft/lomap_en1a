import { BaseEntity } from "./BaseEntity";
import { Visibility } from "./Visibility";

export abstract class Review extends BaseEntity {

    public place: string;
    public owner: string;
    public date: Date;
    public visibility: Visibility;

    public constructor(id: string, place: string, owner: string, date: Date, visibility: Visibility) {
        super(id);
        this.place = place;
        this.date = date;
        this.owner = owner;
        this.visibility = visibility;
    }

    public setPlace(place: string) {
        this.place = place;
    }

    public getPlace(): string {
        return this.place;
    }

    public setOwner(owner: string) {
        this.owner = owner;
    }

    public getOwner(): string {
        return this.owner;
    }

    public setDate(date: Date) {
        this.date = date;
    }

    public getDate(): Date {
        return this.date;
    }

    public getVisibility(): Visibility {
        return this.visibility;
    }

    public setVisibility(visibility: Visibility) {
        this.visibility = visibility;
    }
}