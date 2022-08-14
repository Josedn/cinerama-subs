import { Application, Request, Response, NextFunction } from "express";
import { constants as HttpConstants } from "http2";

import Logger from "../../misc/Logger";
import { writeLineWithRequest } from "../../misc/Utils";
import { CineError } from "./CineError";

const writeLine = Logger.generateLogger("LightsResource");

export default class SubsResource {
    constructor() { }

    public initialize(app: Application): void {
        app.get("*", this.get404);
    }

    private get404 = (req: Request, res: Response, next: NextFunction): void => {
        writeLineWithRequest("Requested 404", req, writeLine);
        this.sendError(res, CineError.PAGE_NOT_FOUND);
    }

    private sendError(res: Response, cineError: CineError, additional?: string) {
        res.status(cineError.httpStatusCode).json({
            error: {
                errorMessage: cineError.errorMessage,
                errorCode: cineError.errorCode,
                additional: additional || null,
            }
        });
    }
}