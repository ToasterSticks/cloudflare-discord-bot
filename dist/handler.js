"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationCommandHandler = void 0;
const itty_router_1 = require("itty-router");
const setup_1 = require("./setup");
const authorize_1 = require("./authorize");
const interaction_1 = require("./interaction");
const router = (0, itty_router_1.Router)();
const createApplicationCommandHandler = (application) => {
    router.get("/", (0, authorize_1.authorize)(application.applicationId, application.permissions));
    const commands = application.commands.reduce((_commands, command) => {
        _commands[command[0].name] = { command: command[0], handler: command[1] };
        return _commands;
    }, {});
    router.post("/interaction", (0, interaction_1.interaction)({ publicKey: application.publicKey, commands, components: application.components }));
    router.get("/setup", (0, setup_1.setup)(application));
    return router.handle;
};
exports.createApplicationCommandHandler = createApplicationCommandHandler;
//# sourceMappingURL=handler.js.map