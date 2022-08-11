"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction = void 0;
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const buffer_1 = require("buffer");
const v10_1 = require("discord-api-types/v10");
const makeValidator = ({ publicKey }) => async (request) => {
    const headers = Object.fromEntries(request.headers);
    const signature = String(headers["x-signature-ed25519"]);
    const timestamp = String(headers["x-signature-timestamp"]);
    const body = await request.json();
    const isValid = tweetnacl_1.default.sign.detached.verify(buffer_1.Buffer.from(timestamp + JSON.stringify(body)), buffer_1.Buffer.from(signature, "hex"), buffer_1.Buffer.from(publicKey, "hex"));
    if (!isValid)
        throw new Error("Invalid request");
};
const jsonResponse = (data) => new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
});
const interaction = ({ publicKey, commands, components = {}, }) => {
    return async (request, ...extra) => {
        const validateRequest = makeValidator({ publicKey });
        try {
            await validateRequest(request.clone());
            try {
                const interaction = (await request.json());
                let handler;
                switch (interaction.type) {
                    case v10_1.InteractionType.Ping: {
                        return jsonResponse({ type: 1 });
                    }
                    case v10_1.InteractionType.ApplicationCommand: {
                        if (interaction.data?.name === undefined)
                            break;
                        handler = commands.get(interaction.data.name)?.handler;
                        break;
                    }
                    case v10_1.InteractionType.MessageComponent: {
                        if (interaction.data?.custom_id === undefined)
                            break;
                        handler = components[interaction.data.custom_id];
                        break;
                    }
                    case v10_1.InteractionType.ApplicationCommandAutocomplete:
                    case v10_1.InteractionType.ModalSubmit:
                        return new Response(null, { status: 500 });
                }
                if (handler === undefined)
                    return new Response(null, { status: 500 });
                return jsonResponse(await handler(interaction, ...extra));
            }
            catch (e) {
                console.log(e.message);
                return new Response(null, { status: 400 });
            }
        }
        catch (e) {
            console.error(e.message);
            return new Response(null, { status: 401 });
        }
    };
};
exports.interaction = interaction;
//# sourceMappingURL=interaction.js.map