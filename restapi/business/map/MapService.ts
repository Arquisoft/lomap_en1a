import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface MapService {

    getMap(places: PlaceDto[]): void;
}