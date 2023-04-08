import { BaseEntity } from "./BaseEntity";
import { Visibility } from "./Visibility";

export class Place extends BaseEntity {

    public name: string;
    public owner: string;
    public description: string;
    public visibility: Visibility;

    public latitude: number;
    public longitude: number;

    public constructor(id: string, name: string, description: string, owner: string, latitude: number, longitude: number, visibility: Visibility) {
        super(id);
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.visibility = visibility;

        this.latitude = latitude;
        this.longitude = longitude;
    }


}