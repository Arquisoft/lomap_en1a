//Factory
import { Factory } from "../../Factory";

//Entities
import { Place } from "../../../../domain/Place";

//Dtos
import { PlaceDto } from "../../../../domain/dtos/PlaceDto";

//Services
import { PlaceService } from "./PlaceService";

//Repositories
import { PlaceRepository } from "../repositories/PlaceRepository";

//Others
import { v4 as generateUUID } from 'uuid';


export class PlaceServiceImpl implements PlaceService {

    private placeRepository: PlaceRepository = Factory.repositories.getPlaceRepository();

    async add(sessionId: string, place: PlaceDto): Promise<boolean> {
        let id = generateUUID();
        let name = place.name;
        let description = place.description;
        let latitude = place.latitude;
        let longitude = place.longitude;
        let visibility = place.visibility;

        if (name == undefined || name == null) {
            return false;
        }

        if (description == undefined || description == null) {
            return false;
        }

        if (latitude == undefined || latitude == null) {
            return false;
        }

        if (longitude == undefined || longitude == null) {
            return false;
        }

        if (visibility == undefined || visibility == null) {
            return false;
        }

        let p = new Place(id, name, description, "", latitude, longitude, visibility);

        return this.placeRepository.add(sessionId, p);
    }

    async findOwn(sessionId: string, user: string): Promise<Place[]> {
        return this.placeRepository.findOwn(sessionId, user);
    }

    async findFriend(sessionId: string, user: string): Promise<Place[]> {
        return this.placeRepository.findFriend(sessionId, user);
    }

    async findPublic(sessionId: string, user: string): Promise<Place[]> {
        return this.placeRepository.findPublic(sessionId, user);
    }
}