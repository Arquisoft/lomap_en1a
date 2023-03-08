import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { PlaceVisibility } from "./Visibility";

export class Place extends BaseEntity {

    private name: string;
    private owner: User;
    private visibility: PlaceVisibility;

    private latitude: number;
    private longitude: number;

    public constructor(id: string, name: string, owner: User, visibility: PlaceVisibility, latitude: number, longitude: number) {
        super(id);
        this.name = name;
        this.owner = owner;
        this.visibility = visibility;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }
}