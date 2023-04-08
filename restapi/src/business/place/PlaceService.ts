import { Place } from "../../domain/Place";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

export interface PlaceService {

    add(sessionId: string, place: PlaceDto): Promise<Place>;
    findOwn(sessionId: string): Promise<Place[]>;
    findFriend(sessionId: string): Promise<Place[]>;
    findFriendForUser(sessionId: string, user: string): Promise<Place[]>;
    findPublic(sessionId: string): Promise<Place[]>;
    findSharedFriends(sessionId: string): Promise<Place[]>;
}