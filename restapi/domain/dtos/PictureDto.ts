import { Place } from "../Place";
import { User } from "../User";

export class PictureDto {

    public id: string | undefined;
    public url: string | undefined;
    public place: Place | undefined;
    public owner: User | undefined;
}