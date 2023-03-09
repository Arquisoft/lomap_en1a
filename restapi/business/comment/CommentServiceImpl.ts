import { CommentDto } from "../../domain/dtos/CommentDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Factory } from "../../Factory";
import { CommentRepository } from "../repositories/CommentRepository";
import { CommentService } from "./CommentService";
import { v4 as generateUUID } from 'uuid';
import { Comment } from "../../domain/Comment";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

export class CommentServiceImpl implements CommentService {

    private commentRepository: CommentRepository = new Factory().repositories.getCommentRepository();

    add(comment: CommentDto, user: UserDto, place: PlaceDto): boolean {
        comment.id = generateUUID();
        return this.commentRepository.add(user, comment, place);
    }

    findById(id: string): Comment {
        return this.commentRepository.findById(id);
    }

    findByUser(user: UserDto): Comment[] {
        return this.commentRepository.findByUser(user);
    }

    findByPlace(place: PlaceDto): Comment[] {
        return this.commentRepository.findByPlace(place);
    }
}