import { PlaceService } from "./PlaceService";
import { PictureDto } from "../../domain/dtos/PictureDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { ScoreRepository } from "../repositories/ScoreRepository";
import { Factory } from "../../Factory";
import { PictureRepository } from "../repositories/PictureRepository";
import { PlaceRepository } from "../repositories/PlaceRepository";
import { v4 as generateUUID } from 'uuid';
import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../../domain/User";

export class PlaceServiceImpl implements PlaceService {

    private placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();
    private userRepository: UserRepository = new Factory().repositories.getUserRepository();

    getAllPlaces(user: UserDto): Promise<Place[]> {
        var places: Place[] = [];

        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        places = places.concat(this.placeRepository.getPlacesByVisibility(user.podId, PlaceVisibility.USER));
        places = places.concat(this.placeRepository.getPlacesByVisibility(user.podId, PlaceVisibility.FRIENDS));
        places = places.concat(this.placeRepository.getPlacesByVisibility(user.podId, PlaceVisibility.GROUP));
        places = places.concat(this.placeRepository.getPlacesByVisibility(user.podId, PlaceVisibility.FULL));

        places = this.uniqByReduce(places);

        return places;
    }

    private uniqByReduce<T>(array: T[]): T[] {
        return array.reduce((acc: T[], cur: T) => {
            if (!acc.includes(cur)) {
                acc.push(cur);
            }
            return acc;
        }, []);
    }


    getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Promise<Place[]> {
        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        return this.placeRepository.getPlacesByVisibility(user.podId, visibilty);
    }

    add(place: PlaceDto, user: UserDto): Promise<boolean> {
        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        if (place.name == undefined) {
            throw new Error("The place name cannot be undefined");
        }

        if (place.visibility == undefined) {
            throw new Error("The place visibility cannot be undefined");
        }


        if (place.latitude == undefined) {
            throw new Error("The place latitude cannot be undefined");
        }


        if (place.longitude == undefined) {
            throw new Error("The place longitude cannot be undefined");
        }

        place.id = generateUUID();
        var p: Place = new Place(place.id, place.name, user.podId, place.visibility, place.latitude, place.longitude);

        this.placeRepository.add(p, user.podId);
    }
}