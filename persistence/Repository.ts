interface Repository<T> {

    get(id: String): T;
    remove(id: String);
    insert(entity: T);
    update(entity: T);

}