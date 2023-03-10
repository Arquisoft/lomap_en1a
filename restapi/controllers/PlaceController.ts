import { Request, Response } from 'express';
import { check, ValidationChain } from 'express-validator';
import { PlaceService } from '../business/place/PlaceService';
import { PlaceDto } from '../domain/dtos/PlaceDto';
import { UserDto } from '../domain/dtos/UserDto';
import { PlaceVisibility } from '../domain/Visibility';
import { Factory } from '../Factory';

export class PlaceController {

    private static placeService: PlaceService = new Factory().services.getPlaceService();

    public static async list(req: Request, res: Response): Promise<Response> {
        var owner: string = <string>req.params.user;

        var user: UserDto = new UserDto();
        user.podId = owner;

        return new Promise((resolve, reject) => {
            this.placeService.getAllPlaces(user).then(b => {
                resolve(res.send(b));
            });
        });
    }

    public static listChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("user").exists());

        return validations;
    }

    public static async listByVisibility(req: Request, res: Response): Promise<Response> {
        var owner: string = <string>req.params.user;
        var filter: string = <string>req.params.visibility;

        var user: UserDto = new UserDto();
        user.podId = owner;

        var index = filter as keyof typeof PlaceVisibility;

        var visibility: PlaceVisibility = PlaceVisibility[index];

        return new Promise((resolve, reject) => {
            this.placeService.getPlacesByVisibility(user, visibility).then(b => {
                resolve(res.send(b));
            });
        });
    }

    public static listByVisibilityChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("user").exists());
        validations.push(check("visibilty").exists());

        return validations;
    }

    public static async details(req: Request, res: Response): Promise<Response> {
        var id: string = <string>req.params.place;

        return new Promise((resolve, reject) => {
            this.placeService.findById(id).then(b => {
                resolve(res.send(b));
            });
        });
    }

    public static detailsChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("place").exists());

        return validations;
    }

    public static async add(req: Request, res: Response): Promise<Response> {
        var owner: string = <string>req.body.user;
        var name: string = <string>req.body.name;
        var filter: string = <string>req.body.visibility;
        var latitude: number = <number>req.body.latitude;
        var longitude: number = <number>req.body.longitude;

        var index = filter as keyof typeof PlaceVisibility;

        var visibility: PlaceVisibility = PlaceVisibility["USER"];//FIXME


        var user: UserDto = new UserDto();

        user.podId = owner;

        var place: PlaceDto = new PlaceDto();
        place.name = name;
        place.latitude = latitude;
        place.longitude = longitude;
        place.visibility = visibility;


        return new Promise((resolve, reject) => {
            this.placeService.add(place, user).then(b => {
                resolve(res.send(b));
            });
        });
    }

    public static addChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("owner").exists());
        validations.push(check("name").exists());
        validations.push(check("filter").exists());
        validations.push(check("latitude").exists().isNumeric());
        validations.push(check("longitude").exists().isNumeric());

        return validations;
    }
}