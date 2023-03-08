import { Request, Response } from 'express';
import { ValidationChain, check } from 'express-validator';
import { PlaceDto } from '../domain/dtos/PlaceDto';
import { MapService } from '../business/map/MapService';
import { Factory } from '../Factory';

export class MapController {

    private static mapService: MapService = new Factory().services.getMapService();

    public static async getMap(req: Request, res: Response): Promise<Response> {

        var places: PlaceDto[] = <PlaceDto[]>req.body.places;

        res.send(this.mapService.getMap(places));
        return res.status(200);
    }

    public static getMapChecks(): ValidationChain[] {
        var validations: ValidationChain[] = [];

        validations.push(check("places").isArray());

        return validations;
    }
}