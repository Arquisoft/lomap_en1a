import { Visibility } from "../Visibility";

export class PictureDto {

    public id: string | undefined;
    public url: string | undefined;
    public place: string | undefined;
    public owner: string | undefined;
    public visibility: Visibility | undefined;
}