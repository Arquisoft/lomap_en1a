import { PlaceDto } from "../domain/dtos/PlaceDto";
import { UserDto } from "../domain/dtos/UserDto";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";

export class PlaceRepositoryImpl {

    add(user: UserDto, place: PlaceDto): void { }
    getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Place[] {
        return [new Place("1", "name", new User("1", "name", "pod"), PlaceVisibility.USER, 1, 1)];
    }
}