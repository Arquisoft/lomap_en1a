import { CommentRepository } from "../business/repositories/CommentRepository";
import { Comment } from "../domain/Comment";
import { CommentDto } from "../domain/dtos/CommentDto";
import { PlaceDto } from "../domain/dtos/PlaceDto";
import { UserDto } from "../domain/dtos/UserDto";

export class CommentRepositoryImpl implements CommentRepository {

    findById(id: string): Comment {
        throw new Error("Method not implemented.");
    }
    findByUser(user: UserDto): Comment[] {
        throw new Error("Method not implemented.");
    }
    findByPlace(user: PlaceDto): Comment[] {
        throw new Error("Method not implemented.");
    }

    add(user: UserDto, comment: CommentDto, place: PlaceDto): boolean { return true; }
}