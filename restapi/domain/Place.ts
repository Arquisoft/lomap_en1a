import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { PlaceVisibility } from "./Visibility";

export class Place extends BaseEntity {

    private name: string;
    private owner: string;
    private visibility: PlaceVisibility;

    private latitude: number;
    private longitude: number;

    public constructor(id: string, name: string, owner: string, visibility: PlaceVisibility, latitude: number, longitude: number) {
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

    public setOwner(owner: string) {
        this.owner = owner;
    }

    public getOwner(): string {
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
    public toString(): string {
        return this.getId() + ": " + this.getLatitude() + "-" + this.getLongitude();
    }
}