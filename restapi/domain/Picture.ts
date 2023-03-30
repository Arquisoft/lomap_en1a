import { Review } from "./Review";

export class Picture extends Review {

    private url: string;

    public constructor(id: string, url: string, place: string, owner: string) {
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