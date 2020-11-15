
import AlarmDotComService from "./service";
import { configure, getLogger } from "log4js";

abstract class App {

    public static main() {
        const logger = getLogger("AlarmDotCom");
        logger.level = "debug";
        configure({
            appenders: { console: { type: "console" } },
            categories: { default: { appenders: ["console"], level: "debug" } }
        });
        try {

            logger.info("Alarm.com service started.");
            const result = AlarmDotComService.login();
            if (!result) { throw new Error("Login failure!") }
        }
        catch (err) {
            if (err instanceof Error) {
                logger.error((err as Error).message);
            }
        }
        finally {
            logger.info("Alarm.com service finished.")
        }
    }
}

App.main();
