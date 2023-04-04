//Factory
import { Factory } from "../../Factory";

//Entities
import { Picture } from "../../../../domain/Picture";

//Dtos
import { PictureDto } from "../../../../domain/dtos/PictureDto";
//Services
import { PictureService } from "./PictureService";

//Repositories
import { PictureRepository } from "../repositories/PictureRepository";

//Others
import { v4 as generateUUID } from 'uuid';

export class PictureServiceImpl implements PictureService {

    private pictureRepository: PictureRepository = Factory.repositories.getPictureRepository();

    async add(sessionId: string, picture: PictureDto): Promise<boolean> {
        let id = generateUUID();
        let url = picture.url;
        let place = picture.place;
        let date = new Date();
        let visibility = picture.visibility;

        if (url == undefined || url == null) {
            return false;
        }

        if (place == undefined || place == null) {
            return false;
        }

        if (visibility == undefined || visibility == null) {
            return false;
        }

        let p = new Picture(id, url, place, "", date, visibility);

        return this.pictureRepository.add(sessionId, p);
    }

    async findOwn(sessionId: string, user: string): Promise<Picture[]> {
        return this.pictureRepository.findOwn(sessionId, user);
    }

    async findByPlace(sessionId: string, place: string): Promise<Picture[]> {
        return this.pictureRepository.findByPlace(sessionId, place);
    }
}