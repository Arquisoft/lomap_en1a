import { Factory } from "../Factory";
import { CommentDto } from '../domain/dtos/CommentDto';
import { UserDto } from '../domain/dtos/UserDto';
import { Request, Response } from 'express';
import { check, ValidationChain } from 'express-validator';
import { CommentService } from "../business/comment/CommentService";
import { PlaceDto } from "../domain/dtos/PlaceDto";

export class CommentController {

    private static commentService: CommentService = new Factory().services.getCommentService();

    public static async add(req: Request, res: Response): Promise<Response> {
        var owner: string = <string>req.body.user;
        var text: string = <string>req.body.comment;
        var placeId: string = <string>req.body.place;

        var comment = new CommentDto();
        comment.text = text;

        var user = new UserDto();
        user.podId = owner;

        var place = new PlaceDto();
        place.id = placeId;

        this.commentService.add(comment, user, place);
        return res.status(200);
    }

    public static addChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("text").exists());
        validations.push(check("user").exists());
        validations.push(check("place").exists());

        return validations;
    }

    public static async list(req: Request, res: Response): Promise<Response> {
        var id: string = <string>req.params.place;

        var place: PlaceDto = new PlaceDto();
        place.id = id;

        res.send(this.commentService.findByPlace(place));
        return res.status(200);
    }

    public static listChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("place").exists());

        return validations;
    }

    public static async details(req: Request, res: Response): Promise<Response> {
        var id: string = <string>req.params.comment;

        res.send(this.commentService.findById(id));

        return res.status(200);
    }

    public static detailsChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("comment").exists());

        return validations;
    }
}