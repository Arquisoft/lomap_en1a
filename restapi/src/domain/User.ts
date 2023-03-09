import { Group } from "./Group";
import { Picture } from "./Picture";
import { Place } from "./Place";
import { Score } from "./Score";

export class User {

    private username: string;
    private password: string;
    private podId: string;

    private places: Place[] = [];

    private comments: Comment[] = [];
    private scores: Score[] = [];
    private pictures: Picture[] = [];

    private friends: User[] = [];
    private groups: Group[] = [];


    public constructor(username: string, password: string, podId: string) {
        this.username = username;
        this.password = password;
        this.podId = podId;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPodId(podId: string) {
        this.podId = podId;
    }

    public getPodId(): string {
        return this.podId;
    }

    public addPlace(place: Place) {
        this.places.push(place);
    }

    public loadPlaces(places: Place[]) {
        this.places = places;
    }

    public addComment(comment: Comment) {
        this.comments.push(comment);
    }

    public loadComments(comments: Comment[]) {
        this.comments = comments;
    }

    public addPicture(picture: Picture) {
        this.pictures.push(picture);
    }

    public loadPictures(pictures: Picture[]) {
        this.pictures = pictures;
    }

    public addScore(score: Score) {
        this.scores.push(score);
    }

    public loadScores(scores: Score[]) {
        this.scores = scores;
    }

    public getFriends(): User[] {
        return [...this.friends];
    }

    public addFriend(friend: User) {
        this.friends.push(friend);
    }

    public loadFriends(friends: User[]) {
        this.friends = friends;
    }

    public getGroups(): Group[] {
        return [...this.groups];
    }

    public addGroup(group: Group) {
        this.groups.push(group);
    }

    public loadGroups(groups: Group[]) {
        this.groups = groups;
    }
}

export enum Role {
    CITIZEN, TOURIST, BUSINESS
}