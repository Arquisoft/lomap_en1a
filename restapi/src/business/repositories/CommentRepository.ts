import { Comment } from "../../../../domain/Comment";

export interface CommentRepository {

    add(sessionId: string, comment: Comment): Promise<boolean>;
    findOwn(sessionId: string, user: string): Promise<Comment[]>;
    findByPlace(sessionId: string, place: string): Promise<Comment[]>;
}