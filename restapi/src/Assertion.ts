import { Response } from 'express';

export class Assertion {

    public static exists(param: any, res: Response): void {
        if (param == undefined || param == null)
            res.send("Invalid request");
    }
}