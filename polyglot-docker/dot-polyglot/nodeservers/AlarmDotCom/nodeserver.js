/* eslint-disable max-len */
"use strict";

trapUncaughtExceptions();

const AsyncLock = require("async-lock");

// Load Polyglot Interface
const Polyglot = useCloud() ?
    require("pgc_interface") :
    require("polyinterface");

const logger = Polyglot.logger;
const lock = new AsyncLock({ timeout: 500 });
const controllerAddress = "controller";

const ControllerNode = require("./Nodes/ControllerNode.js")(Polyglot);
const AreaNode = require("./Nodes/AreaNode.js")(Polyglot);

const usernameParam = "Username";
const pwParam = "Password";

// Default Params
const defaultParams = {
    [usernameParam]: " ",
    [pwParam]: " ",
};

logger.info("Starting Node Server.");

// Create an instance of the Polyglot interface - pass all nodes.
const poly = new Polyglot.Interface([ControllerNode, AreaNode]);

// Connected to MQTT, but config has not arrived yet.
poly.on("mqttConnected", function () {
    logger.info("MQTT Connection started.");
});

// Config received.
poly.on("config", function (config) {
    const nodesCount = Object.keys(config.nodes).length;
    logger.info("Config received has %d nodes", nodesCount);

    if (config.isInitialConfig) {
        // Remove all notices on startup.
        poly.removeNoticesAll();
        if (poly.isCloud) {
            logger.info("Running node server in the cloud.");
            // Send profile if never been sent or server.json changed.
            // Only for PGC.
            poly.updateProfileIfNew();
        } else {
            logger.info("Running node server on premises.");
        }

        // Setup the config fields in the UI.
        initializeCustomParams(config.customParams);

        // Create a controller if we have no nodes.
        if (!nodesCount) {
            try {
                logger.info("Auto creating controller.");
                callAsync(autoCreateController());
            } catch (err) {
                logger.error("Error while creating controller:", err);
            }
        } else {
            try {
                logger.info("Auto delete controller.");
                callAsync(autoDeleteNode(config.nodes[Object.keys(config.nodes)[0]]));
            } catch (err) {
                logger.error("Error while delete controller:", err);
            }
        }
        if (config.newParamsDetected) {
            logger.info("New parameters detected.");
        }
    }
});

// User just completed OAUTH (PGC only).
poly.on("oauth", function (oAuth) {
    logger.info("Received oAuth code %s", oAuth.code);
});

poly.on("poll", function (longPoll) {
    callAsync(doPoll(longPoll));
});

poly.on("stop", async function () {
    logger.info("Graceful stop.");
    await doPoll(false); // Short poll.
    await doPoll(true); // Long poll.
    poly.stop();
});

poly.on("delete", async function () {
    logger.info("Nodeserver is being deleted.");
    poly.stop();
});

poly.on("mqttEnd", async function () {
    logger.info("MQTT connection ended.");
});

poly.on("messageReceived", async function (message) {
    if (!message["config"]) {
        logger.debug("Message received: %o", message);
    }
});

poly.on("messageSent", async function (message) {
    logger.debug("Message sent: %o", message);
});

async function doPoll(longPoll) {
    try {
        await lock.acquire("poll", function () {
            logger.info("%s", longPoll ? "Long poll" : "Short poll");
        });
    } catch (err) {
        logger.error("Error while polling %s", err.message);
    }
}

async function autoCreateController() {
    try {
        await poly.addNode(new ControllerNode(poly, controllerAddress, controllerAddress, "AlarmDotCom Controller"));
    } catch (err) {
        logger.error("Error creating controller node:", err);
    }
}

async function autoDeleteNode(node) {
    try {
        await poly.delNode(node);
    } catch (err) {
        logger.error("Error deleting node:", err);
    }
}

function callAsync(promise) {
    (async function () {
        try {
            await promise;
        } catch (err) {
            logger.error("Error with async function: %s %s", err.message, err.stack);
        }
    })();
}

function initializeCustomParams(currentParams) {
    const defaultParamKeys = Object.keys(defaultParams);
    const currentParamKeys = Object.keys(currentParams);
    // Get orphaned keys.
    const differentKeys = defaultParamKeys.concat(currentParamKeys).filter(function (key) {
        return !(key in defaultParams) || !(key in currentParams);
    });
    if (differentKeys.length) {
        let customParams = {};
        defaultParamKeys.forEach(function (key) {
            customParams[key] = currentParams[key] ?
                currentParams[key] : defaultParams[key];
        });
        poly.saveCustomParams(customParams);
    }
}

function trapUncaughtExceptions() {
    process.on("uncaughtException", function (err) {
        logger.error(`uncaughtException REPORT THIS!: ${err.stack}`);
    });
}

function useCloud() {
    return process.env.MQTTENDPOINT && process.env.STAGE;
}

// Start the server.
poly.start();
