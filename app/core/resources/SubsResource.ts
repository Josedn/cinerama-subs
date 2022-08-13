import { Application, Request, Response, NextFunction } from "express";
import { constants as HttpConstants } from "http2";

import Logger from "../../misc/Logger";
import { writeLineWithRequest } from "../../misc/Utils";

const writeLine = Logger.generateLogger("LightsResource");

export default class SubsResource {
    constructor() { }

    public initialize(app: Application): void {
        app.get("/", this.getIndex);
        app.get("*", this.get404);
    }

    private getIndex = (req: Request, res: Response, next: NextFunction): void => {
        writeLineWithRequest("Requested index", req, writeLine);
        res.status(HttpConstants.HTTP_STATUS_NO_CONTENT).send();
    }

    private get404 = (req: Request, res: Response, next: NextFunction): void => {
        writeLineWithRequest("Requested index", req, writeLine);
        this.sendError(res, "", HttpConstants.HTTP_STATUS_NOT_FOUND);
    }

    private sendError(res: Response, errorMessage: string, httpErrorCode: number) {
        res.status(httpErrorCode).json({
            error: {
                errorMessage,
                errorCode: -1
            }
        });
    }
}