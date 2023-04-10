import { Visibility } from "../Visibility";

export class PlaceDto {

    public id: string | undefined;
    public name: string | undefined;
    public description: string | undefined;
    public visibility: Visibility | undefined;

    public latitude: number | undefined;
    public longitude: number | undefined;
}