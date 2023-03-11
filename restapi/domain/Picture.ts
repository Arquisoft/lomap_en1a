import { Place } from "./Place";
import { Review } from "./Review";
import { User } from "./User";

export class Picture extends Review {

    private url: string;

    public constructor(id: string, url: string, place: Place, owner: string) {
        super(id, place, owner);
        this.url = url;
    }

    public setUrl(url: string) {
        this.url = url;
    }

    public getUrl(): string {
        return this.url;
    }
}