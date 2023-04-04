import { PlaceRepository } from "../business/repositories/PlaceRepository";
import { Place } from "../../../domain/Place";
import { PodManager } from "./pods/PodManager";
import { SolidDataset, Thing } from "@inrupt/solid-client";
import { User } from "../../../domain/User";

export class PlaceRepositoryImpl implements PlaceRepository {

    async add(sessionId: string, place: Place): Promise<boolean> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        place.setOwner(webId);

        return PodManager.dataManager.writeData(sessionId, "places", PodManager.ldJsonCreator.createPlace(place), webId, place.getVisibility().toLowerCase());
    }

    async findOwn(sessionId: string, user: string): Promise<Place[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let dataset: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "places", webId, "private");

        return PodManager.entityParser.parsePlaces(dataset, webId + "lomap/private/places");
    }

    async findFriend(sessionId: string, user: string): Promise<Place[]> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let places: Place[] = [];

        let friends: User[] = await PodManager.dataManager.getFriends(sessionId, webId);

        for (let f in friends) {
            let friend: User = friends[f];
            let thing: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "places", friend.getWebId(), "friends");

            let ps: Place[] = PodManager.entityParser.parsePlaces(thing, friend.getWebId() + "friends/places");
            for (let place in ps) {
                places.push(ps[place]);
            }
        }

        return places;
    }

    async findPublic(sessionId: string, user: string): Promise<Place[]> {
        throw new Error("Method not implemented.");
    }
}