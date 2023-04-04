import { MongoClient } from "mongodb";
import configuration from '../configuration.json';

export class DatabaseConnection {

    private static url = configuration.mongoUrl;

    public static async add(collectionName: string, data: any) {
        let client = await MongoClient.connect(this.url);
        let database = client.db("Lomap");
        let collection = database.collection(collectionName);
        return collection.insertOne(data);
    }

    public static async findOne(collectionName: string, filter: any) {
        let client = await MongoClient.connect(this.url);
        let database = client.db("Lomap");
        let collection = database.collection(collectionName);
        return collection.findOne(filter);
    }

    public static async find(collectionName: string, filter: any) {
        let client = await MongoClient.connect(this.url);
        let database = client.db("Lomap");
        let collection = database.collection(collectionName);
        return collection.find(filter);
    }
}