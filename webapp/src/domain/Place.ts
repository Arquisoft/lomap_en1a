import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";
import { Visibility } from "./Visibility";

export class Place extends BaseEntity {

    public name: string;
    public owner: string;
    public description: string;
    public visibility: Visibility;
    public category: Category

    public latitude: number;
    public longitude: number;

    public constructor(id: string, name: string, description: string, owner: string, latitude: number, longitude: number, visibility: Visibility, category: Category) {
        super(id);
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.visibility = visibility;
        this.category = category

        this.latitude = latitude;
        this.longitude = longitude;
    }


}