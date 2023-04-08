import { User } from "../../domain/User";

/**
 * Declares methods to manage user information retrieval.
 * <p>
 * All methods require the sessionId of the user making the request, for authentication and identification purposes at POD level.
 */
export interface UserService {

    /**
     * Retrieves the profile information of the specified webId.
     * As of now, only retrieves the name and webId.
     * @param sessionId
     * @param webId WebID of the user whose profile we want to fetch.
     * @returns A user with the fetched information.
     */
    getProfile(sessionId: string, webId: string): Promise<User>;

    /**
     * Retrieves the list of friends for the specified user.
     * @param sessionId
     * @param webId WebID of the user whose friends we want to fetch.
     * @returns A list of users.
     */
    getFriends(sessionId: string, webId: string): Promise<User[]>;

    /**
     * Returns true if the current user is logged in.
     * @param sessionId
     */
    isLoggedIn(sessionId: string): Promise<boolean>;
}