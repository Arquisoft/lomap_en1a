//Factory
import { Factory } from "../../Factory";

//Entities
import { Comment } from "../../../../domain/Comment";

//Dtos
import { CommentDto } from "../../../../domain/dtos/CommentDto";

//Services
import { CommentService } from "./CommentService";

//Repositories
import { CommentRepository } from "../repositories/CommentRepository";

//Others
import { v4 as generateUUID } from 'uuid';

export class CommentServiceImpl implements CommentService {

    private commentRepository: CommentRepository = Factory.repositories.getCommentRepository();

    async add(sessionId: string, comment: CommentDto): Promise<string> {
        let id = generateUUID();
        let text = comment.text;
        let place = comment.place;
        let date = new Date();
        let visibility = comment.visibility;

        if (text == undefined || text == null) {
            throw new Error();
        }

        if (place == undefined || place == null) {
            throw new Error();
        }

        if (visibility == undefined || visibility == null) {
            throw new Error();
        }

        let c = new Comment(id, text, place, "", date, visibility);

        if (await this.commentRepository.add(sessionId, c)) {
            return id;
        }

        return "";
    }

    async findOwn(sessionId: string, user: string): Promise<Comment[]> {
        return this.commentRepository.findOwn(sessionId, user);
    }

    async findByPlace(sessionId: string, place: string): Promise<Comment[]> {
        return this.commentRepository.findByPlace(sessionId, place);
    }
}