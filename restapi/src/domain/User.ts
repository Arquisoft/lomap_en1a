export class User {

    private username: string;
    private webId: string;

    public constructor(username: string, webId: string) {
        this.username = username;
        this.webId = webId;
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
        this.webId = webId;
    }
}

export enum Role {
    CITIZEN, TOURIST, BUSINESS
}