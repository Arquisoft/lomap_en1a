export class User {

    private username: string;
    private webId: string;

    public constructor(username: string, webId: string) {
        this.username = username;
        this.webId = webId.split("profile")[0];
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }

    public getWebId(): string {
        return this.webId;
    }

    public setWebId(webId: string) {
        this.webId = webId.split("profile")[0];
    }
}

export enum Role {
    CITIZEN, TOURIST, BUSINESS
}