//Factory
import { Factory } from "../../Factory";
//Entities
import { Comment } from "../../domain/Comment";
//Dtos
import { CommentDto } from "../../domain/dtos/CommentDto";
//Services
import { CommentService } from "./CommentService";
//Repositories
import { CommentRepository } from "../repositories/CommentRepository";
//Others
import { v4 as generateUUID } from 'uuid';

/**
 * Implements the CommentService interface.
 */
export class CommentServiceImpl implements CommentService {

    private commentRepository: CommentRepository = Factory.repositories.getCommentRepository();

    async add(sessionId: string, comment: CommentDto): Promise<boolean> {
        let id = generateUUID();
        let text = comment.text;
        let place = comment.place;
        let date = new Date();
        let visibility = comment.visibility;

        if (text == undefined || text == null) {
            return false;
        }

        if (place == undefined || place == null) {
            return false;
        }

        if (visibility == undefined || visibility == null) {
            return false;
        }

        let c = new Comment(id, text, place, "", date, visibility);

        return this.commentRepository.add(sessionId, c);
    }

    async findOwn(sessionId: string, user: string): Promise<Comment[]> {
        return this.commentRepository.findOwn(sessionId, user);
    }

    async findByPlace(sessionId: string, place: string): Promise<Comment[]> {
        return this.commentRepository.findByPlace(sessionId, place);
    }
}