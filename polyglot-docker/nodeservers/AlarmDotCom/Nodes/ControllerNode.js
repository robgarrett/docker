"use strict";

// nodeDefId must match the id in the nodedef.xml file.
const nodeDefId = "CONTROLLER";

module.exports = function(Polyglot) {
    const logger = Polyglot.logger;

    const AreaNode = require("./AreaNode.js")(Polyglot);

    class Controller extends Polyglot.Node {
        // polyInterface: handle to the interface.
        // address: Node address, without n999_ prefix.
        // primary: same as address, if primary node.
        // name: node name.
        constructor(polyInterface, primary, address, name) {
            super(nodeDefId, polyInterface, primary, address, name);

            // Commands - must match 'accepts' section of nodedef.xml.
            this.commands = {
                DISCOVER: this.onDiscover,
                UPDATE_PROFILE: this.onUpdateProfile,
                QUERY: this.query,
            };

            // Node status - should match the 'sts' section of the nodedef.xml.
            this.drivers = {
                ST: { value: "1", uom: "2" }, // UOM 2 = Boolean, 1 is True
            };

            this.isController = true;
        }

        onDiscover() {
            logger.info("Discovering");
        }

        onUpdateProfile() {
            this.polyInterface.updateProfile();
        }
    };
    Controller.nodeDefId = nodeDefId;
    return Controller;
};
