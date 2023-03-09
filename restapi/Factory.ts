import { MapService } from "./business/map/MapService";
import { MapServiceImpl } from "./business/map/MapServiceImpl";
import { PlaceService } from "./business/place/PlaceService";
import { PlaceServiceImpl } from "./business/place/PlaceServiceImpl";
import { CommentRepository } from "./business/repositories/CommentRepository";
import { PictureRepository } from "./business/repositories/PictureRepository";
import { PlaceRepository } from "./business/repositories/PlaceRepository";
import { ScoreRepository } from "./business/repositories/ScoreRepository";
import { CommentRepositoryImpl } from "./repositories/CommentRepositoryImpl";
import { PictureRepositoryImpl } from "./repositories/PictureRepositoryImpl";
import { PlaceRepositoryImpl } from "./repositories/PlaceRepositoryImpl";
import { ScoreRepositoryImpl } from "./repositories/ScoreRepositoryImpl";

export class Factory {

    public services: ServicesFactory = new ServicesFactory();
    public repositories: RepositoriesFactory = new RepositoriesFactory;
}

class ServicesFactory {

    public getMapService(): MapService {
        return new MapServiceImpl();
    }

    public getPlaceService(): PlaceService {
        return new PlaceServiceImpl();
    }
}

class RepositoriesFactory {

    public getPlaceRepository(): PlaceRepository {
        return new PlaceRepositoryImpl();
    }

    public getCommentRepository(): CommentRepository {
        return new CommentRepositoryImpl();
    }

    public getPictureRepository(): PictureRepository {
        return new PictureRepositoryImpl();
    }

    public getScoreRepository(): ScoreRepository {
        return new ScoreRepositoryImpl();
    }
}