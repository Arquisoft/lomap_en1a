import { BaseEntity } from "./BaseEntity";

export class User extends BaseEntity {

    private username: string;
    private podId: string;

    public constructor(id: string, username: string, podId: string) {
        super(id);
        this.username = username;
        this.podId = podId;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPodId(): string {
        return this.podId;
    }

    public setPodId(podId: string) {
        this.podId = podId;
    }
}

export enum Role {
    CITIZEN, TOURIST, BUSINESS
}