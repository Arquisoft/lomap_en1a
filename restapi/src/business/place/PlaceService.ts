import { Place } from "../../../../domain/Place";
import { PlaceDto } from "../../../../domain/dtos/PlaceDto";

export interface PlaceService {

    add(sessionId: string, place: PlaceDto): Promise<boolean>;
    findOwn(sessionId: string, user: string): Promise<Place[]>;
    findFriend(sessionId: string, user: string): Promise<Place[]>;
    findPublic(sessionId: string, user: string): Promise<Place[]>;
}