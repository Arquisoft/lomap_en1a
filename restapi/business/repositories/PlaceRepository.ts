import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { User } from "../../domain/User";

export interface PlaceRepository {

    add(place: Place, podId: string): boolean;
    findById(id: string): Place;
    getPlacesByVisibility(user: string, visibilty: PlaceVisibility): Place[];
}