export class User {
  public username: string;
  public webId: string;
  public photo: string | null | undefined;

  public constructor(username: string, webId: string) {
    this.username = username;
    this.webId = webId;
  }
}

export enum Role {
  CITIZEN,
  TOURIST,
  BUSINESS,
}
