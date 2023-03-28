import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface PlaceService {

    getAllPlaces(user: UserDto): Promise<Place[]>;
    getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Promise<Place[]>;
    add(place: PlaceDto, user: UserDto): Promise<boolean>;
    findById(id: string): Promise<Place>;
}