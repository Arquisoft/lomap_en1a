import { Place } from "./Place";
import { Review } from "./Review";
import { User } from "./User";

export class Comment extends Review {

    public text: string;

    public constructor(id: string, text: string, place: string, owner: string) {
        super(id, place, owner);
        this.text = text;
    }

    public setText(text: string) {
        this.text = text;
    }

    public getText(): string {
        return this.text;
    }
}