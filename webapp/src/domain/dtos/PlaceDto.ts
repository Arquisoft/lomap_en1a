import { PlaceVisibility } from "../Visibility";

export class PlaceDto {

    public id: string | undefined;
    public name: string | undefined;
    public visibility: PlaceVisibility | undefined;

    public latitude: number | undefined;
    public longitude: number | undefined;
}