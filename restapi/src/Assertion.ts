import { Response } from 'express';

export class Assertion {

    public static exists(param: any, message: string): void {
        if (param == undefined || param == null)
            throw new Error(message);
    }
}