import { CommentDto } from "../../domain/dtos/CommentDto";
import { Comment } from "../../domain/Comment";
import { UserDto } from "../../domain/dtos/UserDto";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

export interface CommentRepository {

    add(user: UserDto, comment: CommentDto, place: PlaceDto): boolean;
    findById(id: string): Comment;
    findByUser(user: UserDto): Comment[];
    findByPlace(user: PlaceDto): Comment[];
}