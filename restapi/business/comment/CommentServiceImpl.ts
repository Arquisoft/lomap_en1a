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
import { resolve } from "path";

export class CommentServiceImpl implements CommentService {

    private commentRepository: CommentRepository = new Factory().repositories.getCommentRepository();
    private placeRepository: PlaceRepository = new Factory().repositories.getPlaceRepository();

    add(comment: CommentDto, user: UserDto, place: PlaceDto): Promise<boolean> {

        return new Promise((resolve, reject) => {
            if (place.id == undefined) {
                throw new Error("The place id cannot be undefined");
            }
            this.placeRepository.findById(place.id).then(
                (place) => {
                    if (user.podId == undefined) {
                        throw new Error("The user id cannot be undefined");
                    }

                    if (comment.text == undefined) {
                        throw new Error("The comment text cannot be undefined");
                    }
                    comment.id = generateUUID();
                    var c: Comment = new Comment(comment.id, comment.text, place, user.podId);
                    resolve(this.commentRepository.add(c, user.podId));
                }
            );
        });
    }

    findById(id: string): Promise<Comment> {
        return this.commentRepository.findById(id);
    }

    findByUser(user: UserDto): Promise<Comment[]> {
        if (user.podId == undefined) {
            throw new Error("The user id cannot be undefined");
        }

        return this.commentRepository.findByUser(user.podId);
    }

    findByPlace(place: PlaceDto): Promise<Comment[]> {
        return new Promise((resolve, reject) => {
            if (place.id == undefined) {
                throw new Error("The place id cannot be undefined");
            }
            this.placeRepository.findById(place.id).then(
                (place) => {
                    resolve(this.commentRepository.findByPlace(place));
                }
            );
        });
    }
}