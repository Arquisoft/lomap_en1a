import { CommentDto } from "../../domain/dtos/CommentDto";
import { UserDto } from "../../domain/dtos/UserDto";

export interface CommentRepository {

    add(user: UserDto, comment: CommentDto): void;
}