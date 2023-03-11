import { BaseEntity } from "./BaseEntity";
import { Place } from "./Place";
import { User } from "./User";

export abstract class Review extends BaseEntity {

    private place: Place;
    private owner: string;

    public constructor(id: string, place: Place, owner: string) {
        super(id);
        this.place = place;
        this.owner = owner;
    }

    public setPlace(place: Place) {
        this.place = place;
    }

    public getPlace(): Place {
        return this.place;
    }

    public setOwner(owner: string) {
        this.owner = owner;
    }

    public getOwner(): string {
        return this.owner;
    }
}