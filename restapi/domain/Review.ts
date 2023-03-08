import { BaseEntity } from "./BaseEntity";
import { Place } from "./Place";
import { User } from "./User";

export abstract class Review extends BaseEntity {

    private place: Place;
    private owner: User;

    public constructor(id: string, place: Place, owner: User) {
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

    public setOwner(owner: User) {
        this.owner = owner;
    }

    public getOwner(): User {
        return this.owner;
    }
}