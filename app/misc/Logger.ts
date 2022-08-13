export default class Logger {
    private static instance: Logger;

    private constructor(private logLevel: LogLevel) { }

    private static getInstance(): Logger {
        if (this.instance == null) {
            this.instance = new Logger(LogLevel.Debug);
        }
        return this.instance;
    }

    static generateLogger(tag: string): (text: string, logLevel?: LogLevel) => void {
        return (text: string, logLevel?: LogLevel) => this.writeLine(text, logLevel || LogLevel.Debug, tag);
    }

    static writeLine(text: string, logLevel: LogLevel, tag: string): void {
        this.getInstance().writeLine(text, logLevel, tag);
    }

    static setLogLevel(logLevel: LogLevel): void {
        this.getInstance().setLogLevel(logLevel);
    }

    private setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    private writeLine(text: string, logLevel: LogLevel, tag: string) {
        if (this.canLog(logLevel)) {
            console.log("[" + LogLevel[logLevel] + "][" + tag + "] - " + text);
        }
    }

    private canLog(logLevel: LogLevel) {
        return this.logLevel <= logLevel;
    }
}

export enum LogLevel {
    Debug,
    Verbose,
    Warning,
    Info,
}