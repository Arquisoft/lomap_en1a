import express, { Request, Response, Router } from "express";
import { Factory } from "./src/Factory";
import { PlaceService } from "./src/business/place/PlaceService";
import { CommentService } from "./src/business/comment/CommentService";
import { ScoreService } from "./src/business/score/ScoreService";
import { PictureService } from "./src/business/picture/PictureService";
import cors from "cors";

const api: Router = express.Router();

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
api.use(bodyParser.json());
api.use(
  cookieSession({
    name: "session",
    // These keys are required by cookie-session to sign the cookies.
    keys: [
      "Required, but value not relevant for this demo - key1",
      "Required, but value not relevant for this demo - key2",
    ],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

api.use(
  cors({
    credentials: true,
    origin: ["https://20.77.68.160", "https://lomapen1a.cloudns.ph", "https://localhost"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
  })
);

//Place

let placeService: PlaceService = Factory.services.getPlaceService();

require("./src/controllers/places.ts")(api, placeService);

//Comment

let commentService: CommentService = Factory.services.getCommentService();

require("./src/controllers/comments.ts")(api, commentService);

//Score

let scoreService: ScoreService = Factory.services.getScoreService();

require("./src/controllers/scores.ts")(api, scoreService);

//Picture

let pictureService: PictureService = Factory.services.getPictureService();

require("./src/controllers/pictures.ts")(api, pictureService);

//User

require("./src/controllers/users.ts")(api);

api.get("/", async (req: Request, res: Response): Promise<Response> => {
  res.send("Rest API for LoMap");

  return res.status(200);
});

export default api;
