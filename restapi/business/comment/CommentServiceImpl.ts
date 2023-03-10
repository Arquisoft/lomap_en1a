import { CommentDto } from "../../domain/dtos/CommentDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Factory } from "../../Factory";
import { CommentRepository } from "../repositories/CommentRepository";
import { CommentService } from "./CommentService";
import { v4 as generateUUID } from 'uuid';
import { Comment } from "../../domain/Comment";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserRepository } from "../repositories/UserRepository";
import { PlaceRepository } from "../repositories/PlaceRepository";
import { Place } from "../../domain/Place";

export class CommentServiceImpl implements CommentService {

    private commentRepository: CommentRepository = new Factory().repositories.getCommentRepository();
    private userRepository: UserRepository = new Factory().repositories.getUserRepository();
    private placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();

    add(comment: CommentDto, user: UserDto, place: PlaceDto): boolean {
        comment.id = generateUUID();

        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        if (place.id == undefined) {
            throw new Error("The place id cannot be undefined");
        }

        if (comment.text == undefined) {
            throw new Error("The comment text cannot be undefined");
        }

        var p: Place = this.placeRepository.findById(place.id);

        var c: Comment = new Comment(comment.id, comment.text, p, user.podId);

        return this.commentRepository.add(c, user.podId);
    }

    findById(id: string): Comment {
        return this.commentRepository.findById(id);
    }

    findByUser(user: UserDto): Comment[] {
        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        return this.commentRepository.findByUser(user.podId);
    }

    findByPlace(place: PlaceDto): Comment[] {
        if (place.id == undefined) {
            throw new Error("The place id cannot be undefined");
        }

        var p: Place = this.placeRepository.findById(place.id);

        return this.commentRepository.findByPlace(p);
    }
}