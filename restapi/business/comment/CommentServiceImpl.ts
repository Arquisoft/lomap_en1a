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
    private placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();

    async add(comment: CommentDto, user: UserDto, place: PlaceDto): Promise<boolean> {
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

        var p: Place = await this.placeRepository.findById(place.id);

        var c: Comment = new Comment(comment.id, comment.text, p, user.podId);

        return this.commentRepository.add(c, user.podId);
    }

    async findById(id: string): Promise<Comment> {
        return this.commentRepository.findById(id);
    }

    async findByUser(user: UserDto): Promise<Comment[]> {
        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        return this.commentRepository.findByUser(user.podId);
    }

    async findByPlace(place: PlaceDto): Promise<Comment[]> {
        if (place.id == undefined) {
            throw new Error("The place id cannot be undefined");
        }

        var p: Place = await this.placeRepository.findById(place.id);

        return this.commentRepository.findByPlace(p);
    }
}