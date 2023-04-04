//Factory
import { Factory } from "../../Factory";

//Entities
import { Score } from "../../../../domain/Score";

//Dtos
import { ScoreDto } from "../../../../domain/dtos/ScoreDto";

//Services
import { ScoreService } from "./ScoreService";

//Repositories
import { ScoreRepository } from "../repositories/ScoreRepository";

//Others
import { v4 as generateUUID } from 'uuid';

export class ScoreServiceImpl implements ScoreService {

    private scoreRepository: ScoreRepository = Factory.repositories.getScoreRepository();

    async add(sessionId: string, score: ScoreDto): Promise<boolean> {
        let id = generateUUID();
        let sc = score.score;
        let place = score.place;
        let date = new Date();
        let visibility = score.visibility;

        if (sc == undefined || sc == null) {
            return false;
        }

        if (sc < 0 || sc > 5) {
            return false;
        }

        if (place == undefined || place == null) {
            return false;
        }

        if (visibility == undefined || visibility == null) {
            return false;
        }

        let s = new Score(id, sc, place, "", date, visibility);

        return this.scoreRepository.add(sessionId, s);
    }

    async findOwn(sessionId: string, user: string): Promise<Score[]> {
        return this.scoreRepository.findOwn(sessionId, user);
    }

    async findByPlace(sessionId: string, place: string): Promise<Score[]> {
        return this.scoreRepository.findByPlace(sessionId, place);
    }
}