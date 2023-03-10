import { PlaceRepository } from "../business/repositories/PlaceRepository";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";

export class PlaceRepositoryImpl implements PlaceRepository {

    private places: Place[] = [new Place("1", "Place 1", "podId", PlaceVisibility.USER, 1, 1)];

    findById(): Place {
        return this.places[0];
    }

    add(place: Place): boolean {
        this.places.push(place);
        return true;
    }

    getPlacesByVisibility(user: string, visibilty: PlaceVisibility): Place[] {
        return this.places;
    }
}