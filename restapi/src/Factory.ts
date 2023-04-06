import { CommentService } from "./business/comment/CommentService";
import { CommentServiceImpl } from "./business/comment/CommentServiceImpl";
import { PictureService } from "./business/picture/PictureService";
import { PictureServiceImpl } from "./business/picture/PictureServiceImpl";
import { PlaceService } from "./business/place/PlaceService";
import { PlaceServiceImpl } from "./business/place/PlaceServiceImpl";
import { CommentRepository } from "./business/repositories/CommentRepository";
import { PictureRepository } from "./business/repositories/PictureRepository";
import { PlaceRepository } from "./business/repositories/PlaceRepository";
import { ScoreRepository } from "./business/repositories/ScoreRepository";
import { UserRepository } from "./business/repositories/UserRepository";
import { ScoreService } from "./business/score/ScoreService";
import { ScoreServiceImpl } from "./business/score/ScoreServiceImpl";
import { UserService } from "./business/user/UserService";
import { UserServiceImpl } from "./business/user/UserServiceImpl";
import { CommentRepositoryImpl } from "./repositories/CommentRepositoryImpl";
import { PictureRepositoryImpl } from "./repositories/PictureRepositoryImpl";
import { PlaceRepositoryImpl } from "./repositories/PlaceRepositoryImpl";
import { ScoreRepositoryImpl } from "./repositories/ScoreRepositoryImpl";
import { UserRepositoryImpl } from "./repositories/UserRepositoryImpl";

class ServicesFactory {

    getUserService(): UserService {
        return new UserServiceImpl();
    }

    public getPlaceService(): PlaceService {
        return new PlaceServiceImpl();
    }

    public getCommentService(): CommentService {
        return new CommentServiceImpl();
    }

    public getScoreService(): ScoreService {
        return new ScoreServiceImpl();
    }

    public getPictureService(): PictureService {
        return new PictureServiceImpl();
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

    public getUserRepository(): UserRepository {
        return new UserRepositoryImpl();
    }
}

export class Factory {

    public static services: ServicesFactory = new ServicesFactory();
    public static repositories: RepositoriesFactory = new RepositoriesFactory();
}