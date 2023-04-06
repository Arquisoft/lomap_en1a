import { Visibility } from "../Visibility";

export class ScoreDto {

    public id: string | undefined;
    public score: number | undefined;
    public place: string | undefined;
    public owner: string | undefined;
    public visibility: Visibility | undefined;
}