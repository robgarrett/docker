"use strict";

const nodeDefId = "AREA";

module.exports = function (Polyglot) {
    const logger = Polyglot.logger;

    class AreaNode extends Polyglot.Node {
        // polyInterface: handle to the interface.
        // address: Node address, without n999_ prefix.
        // primary: same as address, if primary node.
        // name: node name.
        constructor(polyInterface, primary, address, name) {
            super(nodeDefId, polyInterface, primary, address, name);
            // PGC supports setting the node hint.
            // REF: https://github.com/UniversalDevicesInc/hints
            this.hint = "0x010e0100"; // Gateway device.

            // Commands - must match 'accepts' section of nodedef.xml.
            this.commands = {
                SET_ARMED_STATUS: this.setArmedStatus,
            };

            // Node status - should match the 'sts' section of the nodedef.xml.
            this.drivers = {
                ST: { value: "-1", uom: "25" }, // UOM 25 = Range, -1 is Unknown
                GV0: { value: "-1", uom: "25" },
            };
        }

        setArmedStatus(cmd) {
            logger.info("Setting arm status:", cmd);
        }
    };
    AreaNode.nodeDefId = nodeDefId;
    return AreaNode;
};
