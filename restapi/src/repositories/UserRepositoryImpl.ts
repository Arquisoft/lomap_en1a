import { UserRepository } from "../business/repositories/UserRepository";
import { User } from "../domain/User";
import { DatabaseConnection } from "./DatabaseConnection";
import { PodManager } from "./pods/PodManager";

export class UserRepositoryImpl implements UserRepository {

    getProfile(sessionId: string, webId: string): Promise<User> {
        return PodManager.dataManager.getUser(sessionId, webId);
    }

    getFriends(sessionId: string, webId: string): Promise<User[]> {
        return PodManager.dataManager.getFriends(sessionId, webId);
    }

    isLoggedIn(sessionId: string): Promise<boolean> {
        return PodManager.sessionManager.isLoggedIn(sessionId);
    }

    async addFriend(sessionId: string, webId: string): Promise<boolean> {

        let currentUser: string = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let currentUserFriends = (await PodManager.dataManager.getFriends(sessionId, currentUser)).map(user => { return user.getWebId() });

        console.log(currentUserFriends)
        if (!currentUserFriends.includes(webId)) {
            console.log("hola")
            this.sendFriendRequest(sessionId, currentUser, webId);
            this.deleteFriendRequest(sessionId, currentUser, webId);
            return PodManager.dataManager.addFriend(sessionId, webId);
        }

        return false;
    }

    private async sendFriendRequest(sessionId: string, currentUser: string, friend: string) {
        let friendFriends = (await PodManager.dataManager.getFriends(sessionId, friend)).map(user => { return user.getWebId() });

        if (!friendFriends.includes(currentUser)) {
            console.log("kdfsd")
            DatabaseConnection.add("friends",
                {
                    requester: currentUser,
                    requestee: friend
                });
        }
    }

    private async deleteFriendRequest(sessionId: string, currentUser: string, friend: string) {
        let friendFriends = (await PodManager.dataManager.getFriends(sessionId, friend)).map(user => { return user.getWebId() });

        if (friendFriends.includes(currentUser)) {
            DatabaseConnection.delete("friends",
                {
                    requester: friend,
                    requestee: currentUser
                });
        }
    }

    async sharePublicPlaces(sessionId: string): Promise<boolean> {
        let user: string = await PodManager.sessionManager.getCurrentWebId(sessionId);

        let users = await DatabaseConnection.find("publicUsers", { user: user });

        if ((await users.toArray()).length == 0) {
            DatabaseConnection.add("publicUsers",
                {
                    user: user
                });
            return true;
        }

        return false;
    }

    async getPublicUsers(sessionId: string): Promise<User[]> {
        let userList = await DatabaseConnection.find("publicUsers", {});
        let users: User[] = [];

        await Promise.all((await userList.toArray()).map(async (user) => {
            users.push(await PodManager.dataManager.getUser(sessionId, user.user));
        }));

        return users;
    }

    async getFriendRequests(sessionId: string): Promise<User[]> {
        let webId: string = await PodManager.sessionManager.getCurrentWebId(sessionId);
        let userList = await DatabaseConnection.find("friends", { requestee: webId });
        let users: User[] = [];

        await Promise.all((await userList.toArray()).map(async (user) => {
            users.push(await PodManager.dataManager.getUser(sessionId,user.requester));
        }));
        console.log(users)
        return users;
    }

}
