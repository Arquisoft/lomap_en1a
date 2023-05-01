import { Visibility } from "../Visibility";

export class CommentDto {
  public id: string | undefined;
  public text: string | undefined;
  public place: string | undefined;
  public owner: string | undefined;
  public visibility: Visibility | undefined;
}
