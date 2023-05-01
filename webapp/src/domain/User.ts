export class User {
  public username: string;
  public webId: string;
  public photo: string | null | undefined;

  public constructor(username: string, webId: string, photo:string|null) {
    this.username = username;
    this.webId = webId;
    this.photo = photo;
  }
}

