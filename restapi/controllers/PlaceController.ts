import { Request, Response } from 'express';
import { check, ValidationChain } from 'express-validator';
import { PlaceService } from '../business/place/PlaceService';
import { CommentDto } from '../domain/dtos/CommentDto';
import { PictureDto } from '../domain/dtos/PictureDto';
import { PlaceDto } from '../domain/dtos/PlaceDto';
import { ScoreDto } from '../domain/dtos/ScoreDto';
import { UserDto } from '../domain/dtos/UserDto';
import { PlaceVisibility } from '../domain/Visibility';
import { Factory } from '../Factory';

export class PlaceController {

    private static placeService: PlaceService = new Factory().services.getPlaceService();

    public static async getAllPlaces(req: Request, res: Response): Promise<Response> {
        var user: UserDto = <UserDto>req.body.user;

        res.send(this.placeService.getAllPlaces(user));

        return res.status(200);
    }

    public static getAllPlacesChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        return validations;
    }

    public static async getPlacesByVisibility(req: Request, res: Response): Promise<Response> {
        var user: UserDto = <UserDto>req.body.user;
        var visibilty: PlaceVisibility = <PlaceVisibility>req.body.visibilty;

        res.send(this.placeService.getPlacesByVisibility(user, visibilty));

        return res.status(200);
    }

    public static getPlacesByVisibilityChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        return validations;
    }

    public static async getPlace(req: Request, res: Response): Promise<Response> {
        return res.status(200);
    }

    public static getPlaceChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        return validations;
    }

    public static async addScore(req: Request, res: Response): Promise<Response> {
        var user: UserDto = <UserDto>req.body.user;
        var score: ScoreDto = <ScoreDto>req.body.score;

        res.send(this.placeService.addScore(score, user));

        return res.status(200);
    }

    public static addScorePlacesChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        return validations;
    }

    public static async addComment(req: Request, res: Response): Promise<Response> {
        var user: UserDto = <UserDto>req.body.user;
        var comment: CommentDto = <CommentDto>req.body.comment;

        res.send(this.placeService.addComment(comment, user));
        return res.status(200);
    }

    public static addCommentChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        return validations;
    }

    public static async addPicture(req: Request, res: Response): Promise<Response> {
        var user: UserDto = <UserDto>req.body.user;
        var picture: PictureDto = <PictureDto>req.body.picture;

        res.send(this.placeService.addPicture(picture, user));

        return res.status(200);
    }

    public static addPictureChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        return validations;
    }

    public static async addPlace(req: Request, res: Response): Promise<Response> {
        var user: UserDto = <UserDto>req.body.user;
        var place: PlaceDto = <PlaceDto>req.body.place;

        res.send(this.placeService.addPlace(place, user));

        return res.status(200);
    }

    public static addPlaceChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        return validations;
    }

    public static async test(req: Request, res: Response): Promise<Response> {

        //this.placeService.test();

        return res.status(200);
    }
}