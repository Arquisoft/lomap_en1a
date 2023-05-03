import { Place } from "../../domain/Place";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

/**
 * Declares methods to manage place storage.
 * <p>
 * All methods require the sessionId of the user making the request, for authentication and identification purposes at POD level.
 */
export interface PlaceService {
  /**
   * Adds a place.
   * @param sessionId
   * @param place DTO with the required place information.
   * @returns True if the operation was successful, false otherwise.
   */
  add(sessionId: string, place: PlaceDto): Promise<Place>;

  /**
   * Finds places posted by the current user.
   * @param sessionId
   * @returns A list of places.
   */
  findOwn(sessionId: string): Promise<Place[]>;

  /**
   * Finds the places posted to friends of the current user.
   * @param sessionId
   * @returns A list of the places posted to friends.
   */
  findFriend(sessionId: string): Promise<Place[]>;

  /**
   * Finds the places posted to friends of a specific user.
   * @param sessionId
   * @param user WebID of the poster
   * @returns A list of places posted by the user.
   */
  findFriendForUser(sessionId: string, user: string): Promise<Place[]>;

  findPublic(sessionId: string, webId: string): Promise<Place[]>;

  /**
   * Finds all the places shared to the current user by its friends.
   * @param sessionId
   * @returns A list of places posted by friends of the current user.
   */
  findSharedFriends(sessionId: string): Promise<Place[]>;

  /**
   * Finds all public places for the current user.
   * @param sessionId
   * @returns A list of the places publicly posted by the current user.
   */
  findOwnPublic(sessionId: string): Promise<Place[]>;

  findAll(sessionId: string): Promise<Place[]>;
}
