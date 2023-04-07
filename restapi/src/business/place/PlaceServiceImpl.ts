//Factory
import { Factory } from "../../Factory";

//Entities
import { Place } from "../../domain/Place";

//Dtos
import { PlaceDto } from "../../domain/dtos/PlaceDto";

//Services
import { PlaceService } from "./PlaceService";

//Repositories
import { PlaceRepository } from "../repositories/PlaceRepository";

//Others
import { v4 as generateUUID } from 'uuid';


export class PlaceServiceImpl implements PlaceService {

    private placeRepository: PlaceRepository = Factory.repositories.getPlaceRepository();

    async add(sessionId: string, place: PlaceDto): Promise<string> {
        let id = generateUUID();
        let name = place.name;
        let description = place.description;
        let latitude = place.latitude;
        let longitude = place.longitude;
        let visibility = place.visibility;

        if (name == undefined || name == null) {
            throw new Error();
        }

        if (description == undefined || description == null) {
            throw new Error();
        }

        if (latitude == undefined || latitude == null) {
            throw new Error();
        }

        if (longitude == undefined || longitude == null) {
            throw new Error();
        }

        if (visibility == undefined || visibility == null) {
            throw new Error();
        }

        let p = new Place(id, name, description, "", latitude, longitude, visibility);

        if (await this.placeRepository.add(sessionId, p)) {
            return id;
        }

        return "ERROR"
    }

    async findOwn(sessionId: string): Promise<Place[]> {
        return this.placeRepository.findOwn(sessionId);
    }

    async findFriendForUser(sessionId: string, user: string): Promise<Place[]> {
        return this.placeRepository.findFriendForUser(sessionId, user);
    }

    async findFriend(sessionId: string): Promise<Place[]> {
        return this.placeRepository.findFriend(sessionId);
    }

    async findPublic(sessionId: string): Promise<Place[]> {
        return this.placeRepository.findPublic(sessionId);
    }

    async findSharedFriends(sessionId: string): Promise<Place[]> {
        return this.placeRepository.findSharedFriends(sessionId);
    }
}