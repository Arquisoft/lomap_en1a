import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Factory } from "../../Factory";
import { ScoreRepository } from "../repositories/ScoreRepository";
import { ScoreService } from "./ScoreService";
import { v4 as generateUUID } from 'uuid';
import { Score } from "../../domain/Score";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../../domain/User";
import { Place } from "../../domain/Place";
import { PlaceRepository } from "../repositories/PlaceRepository";

export class ScoreServiceImpl implements ScoreService {

    private scoreRepository: ScoreRepository = new Factory().repositories.getScoreRepository();
    private userRepository: UserRepository = new Factory().repositories.getUserRepository();
    private placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();

    add(score: ScoreDto, user: UserDto, place: PlaceDto): boolean {
        score.id = generateUUID();

        if (user.id == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        if (place.id == undefined) {
            throw new Error("The place id cannot be undefined");
        }

        if (score.score == undefined) {
            throw new Error("The score cannot be undefined");
        }

        var u: User = this.userRepository.findById(user.id);
        var p: Place = this.placeRepository.findById(place.id);

        var s = new Score(score.id, score.score, p, u);

        return this.scoreRepository.add(s);
    }

    findById(id: string): Score {
        return this.scoreRepository.findById(id);
    }

    findByUser(user: UserDto): Score[] {
        if (user.id == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        var u: User = this.userRepository.findById(user.id);

        return this.scoreRepository.findByUser(u);
    }

    findByPlace(place: PlaceDto): Score[] {
        if (place.id == undefined) {
            throw new Error("The place id cannot be undefined");
        }

        var p: Place = this.placeRepository.findById(place.id);

        return this.scoreRepository.findByPlace(p);
    }
}