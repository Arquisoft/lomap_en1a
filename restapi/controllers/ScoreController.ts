import { ScoreDto } from "../domain/dtos/ScoreDto";
import { UserDto } from "../domain/dtos/UserDto";
import { Request, Response } from 'express';
import { check, ValidationChain } from 'express-validator';
import { Factory } from "../Factory";
import { ScoreService } from "../business/score/ScoreService";
import { PlaceDto } from "../domain/dtos/PlaceDto";

export class ScoreController {

    private static scoreService: ScoreService = new Factory().services.getScoreService();

    public static async add(req: Request, res: Response): Promise<Response> {
        var owner: string = <string>req.body.user;
        var punt: number = <number>req.body.score;
        var placeId: string = <string>req.body.place;

        var user: UserDto = new UserDto();
        user.podId = owner;

        var score: ScoreDto = new ScoreDto();
        score.score = punt;

        var place = new PlaceDto();
        place.id = placeId;

        res.send(this.scoreService.add(score, user, place));

        return res.status(200);
    }

    public static addChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("user").exists());
        validations.push(check("score").exists());
        validations.push(check("place").exists());

        return validations;
    }

    public static async list(req: Request, res: Response): Promise<Response> {
        var id: string = <string>req.params.place;

        var place: PlaceDto = new PlaceDto();
        place.id = id;

        res.send(this.scoreService.findByPlace(place));
        return res.status(200);
    }

    public static listChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("place").exists());

        return validations;
    }

    public static async details(req: Request, res: Response): Promise<Response> {
        var id: string = <string>req.params.comment;

        res.send(this.scoreService.findById(id));

        return res.status(200);
    }

    public static detailsChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("comment").exists());

        return validations;
    }
}