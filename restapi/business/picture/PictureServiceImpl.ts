import { PictureDto } from "../../domain/dtos/PictureDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Factory } from "../../Factory";
import { PictureRepository } from "../repositories/PictureRepository";
import { PictureService } from "./PictureService";
import { v4 as generateUUID } from 'uuid';
import { Picture } from "../../domain/Picture";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

export class PictureServiceImpl implements PictureService {

    private pictureRepository: PictureRepository = new Factory().repositories.getPictureRepository();

    add(picture: PictureDto, user: UserDto, place: PlaceDto): boolean {
        picture.id = generateUUID();
        return this.pictureRepository.add(user, picture, place);
    }

    findById(id: string): Picture {
        return this.pictureRepository.findById(id);
    }

    findByUser(user: UserDto): Picture[] {
        return this.pictureRepository.findByUser(user);
    }

    findByPlace(place: PlaceDto): Picture[] {
        return this.pictureRepository.findByPlace(place);
    }

}