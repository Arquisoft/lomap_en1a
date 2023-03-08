import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { Factory } from "../../Factory";
import { PlaceRepository } from "../repositories/PlaceRepository";
import { MapService } from "./MapService";

export class MapServiceImpl implements MapService {

    placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();

    getMap(places: PlaceDto[]): void {
        throw new Error("Method not implemented.");
    }
}