import Logger, { LogLevel } from "./misc/Logger";
import ConfigManager from "./misc/ConfigManager";
import Core from "./core/Core";

const writeLine = Logger.generateLogger("ApiEnvironment");

export default class CineramaSubsApp {
    private static initialized = false;
    public static configManager: ConfigManager;
    public static core: Core;

    static async initialize() {
        if (this.initialized) {
            writeLine("Environment already initialized!", LogLevel.Warning);
            return;
        }
        this.initialized = true;
        this.printSplash();
        this.configManager = new ConfigManager();

        this.core = new Core(this.configManager);
        try {
            await this.core.initialize();
            writeLine("The environment has initialized successfully. Ready for connections.", LogLevel.Info);
        } catch (err) {
            writeLine("Error initializing server: " + (err as Error).message, LogLevel.Warning);
            process.exit(0);
        }
    }

    private static printSplash() {
        console.log("cinerama-subs 1.0.0 alpha");
        console.log("Copyright (c) 2022 - filmstock.tv");
        console.log();
    }
}