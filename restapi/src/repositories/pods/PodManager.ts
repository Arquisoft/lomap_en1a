import { EntityParser } from "./EntityParser";
import { LDJsonCreator } from "./LDJsonCreator";
import { PodDataManager } from "./PodDataManager";
import { PodSessionManager } from "./PodSessionManager";

export class PodManager {

    public static sessionManager: PodSessionManager = new PodSessionManager();
    public static dataManager: PodDataManager = new PodDataManager();
    public static ldJsonCreator: LDJsonCreator = new LDJsonCreator();
    public static entityParser: EntityParser = new EntityParser();
}