export class User {
  private username: string;
  private webId: string;
  private photo: string | null;

  public constructor(username: string, webId: string, photo: string | null) {
    this.username = username;
    this.webId = webId.split("profile")[0];
    this.photo = photo;
  }
  public getUsername(): string {
    return this.username;
  }

  public getWebId(): string {
    return this.webId;
  }

  public getPhoto(): string | null {
    return this.photo;
  }
}

export enum Role {
  CITIZEN,
  TOURIST,
  BUSINESS,
}
