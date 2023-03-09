import { CommentDto } from "../../domain/dtos/CommentDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Comment } from "../../domain/Comment";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

export interface CommentService {

    add(comment: CommentDto, user: UserDto, place: PlaceDto): boolean;
    findById(id: string): Comment;
    findByUser(user: UserDto): Comment[];
    findByPlace(user: PlaceDto): Comment[];
}