import { PictureDto } from "../domain/dtos/PictureDto";
import { UserDto } from "../domain/dtos/UserDto";
import { Request, Response } from 'express';
import { check, ValidationChain } from 'express-validator';
import { PictureService } from "../business/picture/PictureService";
import { Factory } from "../Factory";
import { PlaceDto } from "../domain/dtos/PlaceDto";

export class PictureController {

    private static pictureService: PictureService = new Factory().services.getPictureService();

    public static async add(req: Request, res: Response): Promise<Response> {
        var owner: string = <string>req.body.user;
        var url: string = <string>req.body.picture;
        var placeId: string = <string>req.body.place;

        var user: UserDto = new UserDto();
        user.podId = owner;

        var picture: PictureDto = new PictureDto();
        picture.url = url;

        var place = new PlaceDto();
        place.id = placeId;

        this.pictureService.add(picture, user, place);

        return res.status(200);
    }

    public static addChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("user").exists());
        validations.push(check("picture").exists());
        validations.push(check("place").exists());

        return validations;
    }

    public static async list(req: Request, res: Response): Promise<Response> {
        var id: string = <string>req.body.place;

        var place: PlaceDto = new PlaceDto();
        place.id = id;

        res.send(this.pictureService.findByPlace(place));
        return res.status(200);
    }

    public static listChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("place").exists());

        return validations;
    }

    public static async details(req: Request, res: Response): Promise<Response> {
        var id: string = <string>req.body.picture;

        res.send(this.pictureService.findById(id));

        return res.status(200);
    }

    public static detailsChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("picture"));

        return validations;
    }
}