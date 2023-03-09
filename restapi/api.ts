import express, { Request, Response, Router } from 'express';
import { MapController } from './controllers/MapController';
import { PlaceController } from './controllers/PlaceController';

const api: Router = express.Router();

//Map
//Get a map
api.post("/map", MapController.getMapChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return MapController.getMap(req, res);
  }
);

//Place
api.post("/place/listall", PlaceController.getAllPlacesChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.getAllPlaces(req, res);
  }
);

//List places by visibility
api.post("/place/list", PlaceController.getPlacesByVisibilityChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.getPlacesByVisibility(req, res);
  }
);

//Get a place
api.post("/place/details", PlaceController.addScorePlacesChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.addScore(req, res);
  }
);

//Add a place
api.post("/place/add", PlaceController.addPlaceChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.addPlace(req, res);
  }
);

//Reviews
//Add a score
api.post("/score/add", PlaceController.addScorePlacesChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.addScore(req, res);
  }
);

//Add a comment
api.post("/comment/add", PlaceController.addCommentChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.addComment(req, res);
  }
);

//Add a picture
api.post("/picture/add", PlaceController.addPictureChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.addPicture(req, res);
  }
);

export default api;