import { PlaceService } from "./PlaceService";

import { PlaceDto } from "../../domain/dtos/PlaceDto";

import { UserDto } from "../../domain/dtos/UserDto";

import { Factory } from "../../Factory";

import { PlaceRepository } from "../repositories/PlaceRepository";
import { v4 as generateUUID } from 'uuid';
import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";
import { UserRepository } from "../repositories/UserRepository";
import { PlaceRepositoryImpl } from "../../repositories/PlaceRepositoryImpl";
import { UserRepositoryImpl } from "../../repositories/UserRepositoryImpl";


export class PlaceServiceImpl implements PlaceService {

    private placeRepository: PlaceRepository = new PlaceRepositoryImpl();
    //new Factory().repositories.getPlaceRepository();
    //private userRepository: UserRepository = new UserRepositoryImpl();
    //new Factory().repositories.getUserRepository();

    async getAllPlaces(user: UserDto): Promise<Place[]> {
        var places: Place[] = [];

        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }



        return this.placeRepository.getAllPlaces(user.podId);
    }

    private uniqByReduce<T>(array: T[]): T[] {
        return array.reduce((acc: T[], cur: T) => {
            if (!acc.includes(cur)) {
                acc.push(cur);
            }
            return acc;
        }, []);
    }

    async getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Promise<Place[]> {
        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        return await this.placeRepository.getPlacesByVisibility(user.podId, visibilty);
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