import { Request } from "express";
import { LogLevel } from "./Logger";

export const writeLineWithRequest = (line: string, req: Request, writeLine: (text: string, logLevel?: LogLevel) => void) => {
    const address = req.connection.remoteAddress;
    if (address != null) {
        writeLine(line + " from " + address);
    } else {
        writeLine(line + " with null address", LogLevel.Warning);
    }
};