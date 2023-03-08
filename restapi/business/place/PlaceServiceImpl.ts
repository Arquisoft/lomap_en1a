import { PlaceService } from "./PlaceService";
import { CommentDto } from "../../domain/dtos/CommentDto";
import { PictureDto } from "../../domain/dtos/PictureDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { ScoreRepository } from "../repositories/ScoreRepository";
import { Factory } from "../../Factory";
import { CommentRepository } from "../repositories/CommentRepository";
import { PictureRepository } from "../repositories/PictureRepository";
import { PlaceRepository } from "../repositories/PlaceRepository";
import { v4 as generateUUID } from 'uuid';
import { Place } from "../../domain/Place";
import { PlaceVisibility } from "../../domain/Visibility";

export class PlaceServiceImpl implements PlaceService {

    scoreRepository: ScoreRepository = new Factory().repositories.getScoreRepository();
    commentRepository: CommentRepository = new Factory().repositories.getCommentRepository();
    pictureRepository: PictureRepository = new Factory().repositories.getPictureRepository();
    placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();

    getAllPlaces(user: UserDto): Place[] {
        var places: Place[] = [];

        places = places.concat(this.placeRepository.getPlacesByVisibility(user, PlaceVisibility.USER));
        places = places.concat(this.placeRepository.getPlacesByVisibility(user, PlaceVisibility.FRIENDS));
        places = places.concat(this.placeRepository.getPlacesByVisibility(user, PlaceVisibility.GROUP));
        places = places.concat(this.placeRepository.getPlacesByVisibility(user, PlaceVisibility.FULL));

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


    getPlacesByVisibility(user: UserDto, visibilty: PlaceVisibility): Place[] {
        return this.placeRepository.getPlacesByVisibility(user, visibilty);
    }

    addScore(score: ScoreDto, user: UserDto): void {
        score.id = generateUUID();
        this.scoreRepository.add(user, score);
    }

    addComment(comment: CommentDto, user: UserDto): void {
        comment.id = generateUUID();
        this.commentRepository.add(user, comment);
    }

    addPicture(picture: PictureDto, user: UserDto): void {
        picture.id = generateUUID();
        this.pictureRepository.add(user, picture);
    }

    addPlace(place: PlaceDto, user: UserDto): void {
        place.id = generateUUID();
        this.placeRepository.add(user, place);
    }
}