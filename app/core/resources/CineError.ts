import { constants as HttpConstants } from "http2";

let errorCode = 5038;
export class CineError {
    public static readonly NOT_AUTHORIZED = new CineError("Not authorized", HttpConstants.HTTP_STATUS_UNAUTHORIZED, errorCode++);
    public static readonly PAGE_NOT_FOUND = new CineError("Not found", HttpConstants.HTTP_STATUS_NOT_FOUND, errorCode++);
    constructor(public errorMessage: string, public httpStatusCode: number, public errorCode: number) { }
}
