import { Place } from "../Place";
import { User } from "../User";

export class CommentDto {

    public id: string | undefined;
    public text: string | undefined;
    public place: Place | undefined;
    public owner: User | undefined;
}