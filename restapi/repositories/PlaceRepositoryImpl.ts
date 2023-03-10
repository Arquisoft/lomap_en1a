import { PlaceRepository } from "../business/repositories/PlaceRepository";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";

export class PlaceRepositoryImpl implements PlaceRepository {

    private u: User = new User("1", "User 1", "podId");
    private places: Place[] = [new Place("1", "Place 1", this.u, PlaceVisibility.USER, 1, 1)];

    findById(): Place {
        return this.places[0];
    }

    add(place: Place): boolean {
        this.places.push(place);
        return true;
    }

    getPlacesByVisibility(user: User, visibilty: PlaceVisibility): Place[] {
        return [new Place("1", "name", new User("1", "name", "pod"), PlaceVisibility.USER, 1, 1)];
    }
}