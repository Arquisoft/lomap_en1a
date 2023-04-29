export class User {
  private username: string;
  private webId: string;
  private photo: string | null;

  public constructor(username: string, webId: string, photo: string | null) {
    this.username = username;
    this.webId = webId.split("profile")[0];
    this.photo = photo;
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

  public getPhoto(): string | null {
    return this.photo;
  }

  public setPhoto(photo: string | null) {
    this.photo = photo;
  }
}

export enum Role {
  CITIZEN,
  TOURIST,
  BUSINESS,
}
