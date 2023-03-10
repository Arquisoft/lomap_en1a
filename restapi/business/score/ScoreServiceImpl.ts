import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Factory } from "../../Factory";
import { ScoreRepository } from "../repositories/ScoreRepository";
import { ScoreService } from "./ScoreService";
import { v4 as generateUUID } from 'uuid';
import { Score } from "../../domain/Score";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

export class ScoreServiceImpl implements ScoreService {

    private scoreRepository: ScoreRepository = new Factory().repositories.getScoreRepository();

    add(score: ScoreDto, user: UserDto, place: PlaceDto): boolean {
        score.id = generateUUID();
        return this.scoreRepository.add(user, score, place);
    }

    findById(id: string): Score {
        return this.scoreRepository.findById(id);
    }

    findByUser(user: UserDto): Score[] {
        return this.scoreRepository.findByUser(user);
    }

    findByPlace(place: PlaceDto): Score[] {
        return this.scoreRepository.findByPlace(place);
    }
}