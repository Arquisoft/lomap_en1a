import { PictureDto } from "../../domain/dtos/PictureDto";
import { Picture } from "../../domain/Picture";

/**
 * Declares methods to manage image storage.
 * <p>
 * All methods require the sessionId of the user making the request, for authentication purposes at POD level.
 */
export interface PictureService {

    /**
     * Adds an image
     * @param sessionId
     * @param picture DTO with the required image information.
     * @returns True if the operation was successful, false otherwise.
     */
    add(sessionId: string, picture: PictureDto): Promise<boolean>;

    /**
     * Finds images posted by a user.
     * @param sessionId
     * @param user REMOVE
     * @returns A list of images posted by the user.
     */
    // TODO: Remove 'user'
    findOwn(sessionId: string, user: string): Promise<Picture[]>;

    /**
     * Finds images posted about a certain place.
     * <p>
     * Retrieves images posted by the current user or its friends; as long as they have shared said
     * images with the current user.
     * @param sessionId
     * @param place ID of the place for which to find images.
     * @returns A list of images about a place.
     */
    findByPlace(sessionId: string, place: string): Promise<Picture[]>;
}