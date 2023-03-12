import { Place } from "../Place";
import { User } from "../User";

export class ScoreDto {

    public id: string | undefined;
    public score: number | undefined;
    public place: Place | undefined;
    public owner: User | undefined;
}