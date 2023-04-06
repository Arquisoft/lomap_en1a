import { CommentDto } from "../../domain/dtos/CommentDto";
import { Comment } from "../../domain/Comment";

export interface CommentService {

    add(sessionId: string, comment: CommentDto): Promise<boolean>;
    findOwn(sessionId: string, user: string): Promise<Comment[]>;
    findByPlace(sessionId: string, place: string): Promise<Comment[]>;
}