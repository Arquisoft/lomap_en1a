import { BaseEntity } from "./BaseEntity";
import { Place } from "./Place";
import { User } from "./User";

export abstract class Review extends BaseEntity {

    public place: string;
    public owner: string;

    public constructor(id: string, place: string, owner: string) {
        super(id);
        this.place = place;
        this.owner = owner;
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
}