import { BaseEntity } from "./BaseEntity";
import { Visibility } from "./Visibility";

export class Place extends BaseEntity {

    private name: string;
    private owner: string;
    private description: string;
    private visibility: Visibility;

    private latitude: number;
    private longitude: number;


    public constructor(id: string, name: string, description: string, owner: string, latitude: number, longitude: number, visibility: Visibility) {
        super(id);
        this.name = name;
        this.description = description;
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

    public setDescription(description: string) {
        this.description = description;
    }

    public getDescription(): string {
        return this.description;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public setVisibility(visibility: Visibility) {
        this.visibility = visibility;
    }

    public getVisibility(): Visibility {
        return this.visibility;
    }

    public toString(): string {
        return this.getId() + ": " + this.getLatitude() + "-" + this.getLongitude();
    }
}