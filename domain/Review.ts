import { Place } from "./Place";
import { User } from "./User";

export abstract class Review {

    private place: Place;
    private owner: User;

    public constructor(place: Place, owner: User) {
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