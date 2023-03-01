import { User } from "./User";
import { PlaceVisibility } from "./Visibility";

export class Place {

    private name: string;
    private owner: User;
    private visibility: PlaceVisibility;

    public constructor(name: string, owner: User, visibility: PlaceVisibility) {
        this.name = name;
        this.owner = owner;
        this.visibility = visibility;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setOwner(owner: User) {
        this.owner = owner;
    }

    public getOwner(): User {
        return this.owner;
    }

    public setVisibility(visibility: PlaceVisibility) {
        this.visibility = visibility;
    }

    public getVisibility(): PlaceVisibility {
        return this.visibility;
    }

    public isVisibleFor(user: User): boolean {
        return this.visibility.isVisibleFor(user, this);
    }
}