import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { User } from "../../domain/User";

export interface PlaceRepository {

    add(place: Place): boolean;
    findById(id: string): Place;
    getPlacesByVisibility(user: User, visibilty: PlaceVisibility): Place[];
}