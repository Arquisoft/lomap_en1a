import {
  SolidDataset,
  createSolidDataset,
  getSolidDataset,
} from "@inrupt/solid-client";
import { getSessionFromStorage } from "@inrupt/solid-client-authn-node/dist/multiSession";

export class Worker {
  private result: SolidDataset | undefined;
  private sessionId: string;
  private resource: string;

  constructor(sessionId: string, resource: string) {
    this.sessionId = sessionId;
    this.resource = resource;
  }

  public async run(): Promise<void> {
    console.log(this.resource);

    let session = await getSessionFromStorage(this.sessionId);

    if (session == null) {
      throw new Error("The user must be logged in.");
    }

    let dataset = createSolidDataset();

    try {
      dataset = await getSolidDataset(this.resource, {
        fetch: session.fetch,
      });
    } catch (e) {
      console.log(e);
    }

    this.result = dataset;
  }

  public getResult(): SolidDataset {
    if (this.result === undefined) {
      throw new Error("Result is undefined");
    }
    return this.result;
  }

  public hasFinished(): boolean {
    return this.result !== undefined;
  }
}
