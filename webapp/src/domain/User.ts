export class User {
    user_id: String;

    constructor(id: String) {
        this.user_id = id;
    }
    getId() {
        return this.user_id;
    }
}