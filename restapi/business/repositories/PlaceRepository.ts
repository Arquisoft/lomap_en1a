import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { User } from "../../domain/User";

export interface PlaceRepository {

    add(place: Place, podId: string): Promise<boolean>;
    findById(id: string): Promise<Place>;
    getPlacesByVisibility(user: string, visibilty: PlaceVisibility): Promise<Place[]>;
    getAllPlaces(user: string): Promise<Place[]>;
}