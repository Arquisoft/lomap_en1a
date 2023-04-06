import { Place } from "../../domain/Place";

export interface PlaceRepository {

    add(sessionId: string, place: Place): Promise<boolean>;
    findOwn(sessionId: string): Promise<Place[]>;
    findFriend(sessionId: string, user: string): Promise<Place[]>;
    findPublic(sessionId: string): Promise<Place[]>;
    findSharedFriends(sessionId: string): Promise<Place[]>;
}