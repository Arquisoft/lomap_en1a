import { EntityParser } from "./EntityParser";
import { RDFCreator } from "./RDFCreator";
import { PodDataManager } from "./PodDataManager";
import { PodSessionManager } from "./PodSessionManager";
import { PermissionManager } from "./PermissionManager";

export class PodManager {
  public static sessionManager: PodSessionManager = new PodSessionManager();
  public static dataManager: PodDataManager = new PodDataManager();
  public static rdfCreator: RDFCreator = new RDFCreator();
  public static entityParser: EntityParser = new EntityParser();
  public static permissionManager: PermissionManager = new PermissionManager();
}
