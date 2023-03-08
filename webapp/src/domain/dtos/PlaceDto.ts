import { User } from "../User";
import { PlaceVisibility } from "../Visibility";

export class PlaceDto {

    public id: string | undefined;
    private name: string | undefined;
    private visibility: PlaceVisibility | undefined;
}