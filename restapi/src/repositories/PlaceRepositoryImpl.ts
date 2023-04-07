import { PlaceRepository } from "../business/repositories/PlaceRepository";
import { Place } from "../domain/Place";
import { PodManager } from "./pods/PodManager";
import { SolidDataset } from "@inrupt/solid-client";
import { User } from "../domain/User";

export class PlaceRepositoryImpl implements PlaceRepository {

    async add(sessionId: string, place: Place): Promise<boolean> {
        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        place.setOwner(webId);

        return PodManager.dataManager.writeData(sessionId, "places", PodManager.rdfCreator.createPlace(place), webId, place.getVisibility().toLowerCase());
    }

    async findOwn(sessionId: string): Promise<Place[]> {
        let user: string = await PodManager.sessionManager.getCurrentWebId(sessionId);
        return this.find(sessionId, user, "private");
    }

    async findFriend(sessionId: string, user: string): Promise<Place[]> {
        return this.find(sessionId, user, "friends");
    }

    async findPublic(sessionId: string): Promise<Place[]> {
        let user: string = await PodManager.sessionManager.getCurrentWebId(sessionId);
        return this.find(sessionId, user, "public");
    }

    private async find(sessionId: string, user: string, zone: string) {

        let dataset: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "places", user, zone);

        return PodManager.entityParser.parsePlaces(dataset);
    }

    async findSharedFriends(sessionId: string): Promise<Place[]> {

        let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let places: Place[] = [];

        let friends: User[] = await PodManager.dataManager.getFriends(sessionId, webId);

        for (let f in friends) {
            let friend: User = friends[f];
            let thing: SolidDataset = await PodManager.dataManager.fetchData(sessionId, "places", friend.getWebId(), "friends");
            console.log("-------------------------------------------")
            console.log(friend)
            console.log(thing)
            console.log("-------------------------------------------")

            let ps: Place[] = PodManager.entityParser.parsePlaces(thing);
            for (let place in ps) {
                places.push(ps[place]);
            }
        }

        return places;
    }
}