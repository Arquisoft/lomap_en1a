import { Picture } from "../../domain/Picture";

/**
 * Declares methods to manage image storage.
 * <p>
 * Is used by the Picture service to perform its operations.
 */
export interface PictureRepository {
  /**
   * Adds an image to the user's POD.
   * @param sessionId
   * @param picture
   * @returns True if the operation was successful, false otherwise.
   */
  add(sessionId: string, picture: Picture): Promise<boolean>;

  /**
   * Finds images posted about a specific place.
   * @param sessionId
   * @param place Id of the place
   * @returns A list of the images found.
   */
  findByPlace(sessionId: string, place: string): Promise<Picture[]>;
}
