interface Repository<T> {

    getTbyId(id: String): T;
    save(entity: T);
    remove(entity: T);
    update(entity: T);


}