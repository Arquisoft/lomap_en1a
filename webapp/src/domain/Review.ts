import { BaseEntity } from "./BaseEntity";
import { Visibility } from "./Visibility";

export abstract class Review extends BaseEntity {

    public place: string;
    public owner: string;
    public date: Date;
    public visibility: Visibility;

    public constructor(id: string, place: string, owner: string, date: Date, visibility: Visibility) {
        super(id);
        this.place = place;
        this.date = date;
        this.owner = owner;
        this.visibility = visibility;
    }

}