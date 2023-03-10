import { PictureDto } from "../../domain/dtos/PictureDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Factory } from "../../Factory";
import { PictureRepository } from "../repositories/PictureRepository";
import { PictureService } from "./PictureService";
import { v4 as generateUUID } from 'uuid';
import { Picture } from "../../domain/Picture";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { User } from "../../domain/User";
import { Place } from "../../domain/Place";
import { UserRepository } from "../repositories/UserRepository";
import { PlaceRepository } from "../repositories/PlaceRepository";

export class PictureServiceImpl implements PictureService {

    private pictureRepository: PictureRepository = new Factory().repositories.getPictureRepository();
    private userRepository: UserRepository = new Factory().repositories.getUserRepository();
    private placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();

    async add(picture: PictureDto, user: UserDto, place: PlaceDto): Promise<boolean> {
        picture.id = generateUUID();

        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        if (place.id == undefined) {
            throw new Error("The place id cannot be undefined");
        }

        if (picture.url == undefined) {
            throw new Error("The picture url cannot be undefined");
        }

        var p: Place = await this.placeRepository.findById(place.id);

        var pic: Picture = new Picture(picture.id, picture.url, p, user.podId);

        return this.pictureRepository.add(pic, user.podId);
    }

    async findById(id: string): Promise<Picture> {
        return this.pictureRepository.findById(id);
    }

    async findByUser(user: UserDto): Promise<Picture[]> {
        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        return this.pictureRepository.findByUser(user.podId);
    }

    async findByPlace(place: PlaceDto): Promise<Picture[]> {
        if (place.id == undefined) {
            throw new Error("The place id cannot be undefined");
        }

        var p: Place = await this.placeRepository.findById(place.id);

        return this.pictureRepository.findByPlace(p);
    }

}