import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface PlaceRepository {

    add(user: UserDto, place: PlaceDto): void;
    getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Place[];
}