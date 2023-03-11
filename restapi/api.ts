import express, { Request, Response, Router } from 'express';
import { CommentController } from './controllers/CommentController';
import { PictureController } from './controllers/PictureController';
import { PlaceController } from './controllers/PlaceController';
import { ScoreController } from './controllers/ScoreController';


const api: Router = express.Router();

// const for locally storing images (Prototype only)
/*const multer  = require('multer'); 
const app = express();
const exp = require("express");*/

//Place

//List all places
api.get("/place/list/:user", PlaceController.listChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    console.log("API REST:LIST")
    return PlaceController.list(req, res);
  }
);

//List places by visibility
api.get("/place/list/visibility:user:visibility", PlaceController.listByVisibilityChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.listByVisibility(req, res);
  }
);

//Get a place
api.get("/place/details:place", PlaceController.detailsChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PlaceController.details(req, res);
  }
);

//Add a place
api.post("/place/add", PlaceController.addChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    console.log("API REST:ADD")
    return PlaceController.add(req, res);
  }
);

//Score

//List all scores
api.post("/score/list:user", ScoreController.listChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return ScoreController.list(req, res);
  }
);

//Get a score
api.post("/score/details:score", ScoreController.detailsChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return ScoreController.details(req, res);
  }
);

//Add a score
api.post("/score/add", ScoreController.addChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return ScoreController.add(req, res);
  }
);

//Comment

//List all comments
api.get("/comment/list:place", CommentController.listChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return CommentController.list(req, res);
  }
);

//Get a comment
api.get("/comment/details:comment", CommentController.detailsChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return CommentController.details(req, res);
  }
);

//Add a comment
api.post("/comment/add", CommentController.addChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return CommentController.add(req, res);
  }
);

//Picture

//List all pictures
api.get("/picture/list:user", PictureController.listChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PictureController.list(req, res);
  }
);

//Get a picture
api.get("/picture/details:picture", PictureController.detailsChecks(),
  async (req: Request, res: Response): Promise<Response> => {
    return PictureController.details(req, res);
  }
);

//Add a picture
api.post("/picture/add", PictureController.addChecks(), // upload.single('myFile'), 
  async (req: Request, res: Response): Promise<Response> => {
    return PictureController.add(req, res);
    //return res.status(200);
  }
);

api.get("/",
  async (req: Request, res: Response): Promise<Response> => {

    res.send("Rest API for LoMap");

    return res.status(200);
  });




// setup multer for file upload
/*api.use(express.json());
api.use(express.static(__dirname + "/../webapp/images"));

var storage = multer.diskStorage(
  {
      destination: './images',
      filename: function (req:any, file:any, cb:any ) {
          cb( null, file.originalname);
      }
  }
);
const upload = multer({ storage: storage } )

// route for file upload
api.post("/api/uploadfile", upload.single('myFile'), async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendStatus(200);
});

//app.listen(4000, () => console.log("Listening on port 4000"));*/


export default api;