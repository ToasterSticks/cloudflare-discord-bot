"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const buffer_1 = require("buffer");
const btoa = (value) => buffer_1.Buffer.from(value, "binary").toString("base64");
const getAuthorizationCode = async (headers) => {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    const request = new Request("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: "client_credentials",
            scope: "applications.commands.update",
        }).toString(),
        headers: headers,
    });
    const response = await fetch(request);
    if (!response.ok)
        throw new Error("Failed to request an Authorization code.");
    try {
        const data = await response.json();
        return data.access_token;
    }
    catch {
        throw new Error("Failed to parse the Authorization code response.");
    }
};
const resolveCommandsEndpoint = (applicationId, guildId) => {
    const url = `https://discord.com/api/v8/applications/${applicationId}`;
    if (guildId) {
        return `${url}/guilds/${guildId}/commands`;
    }
    return `${url}/commands`;
};
const createCommands = async ({ applicationId, guildId, commands, }, bearer) => {
    const url = resolveCommandsEndpoint(applicationId, guildId);
    const request = new Request(url, {
        method: "PUT",
        body: JSON.stringify(commands),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${bearer}` },
    });
    return fetch(request)
        .then(() => new Response("OK"))
        .catch((e) => new Response(e.message, { status: 502 }));
};
const setup = ({ applicationId, applicationSecret, guildId, commands }) => {
    const authorization = btoa(unescape(encodeURIComponent(applicationId + ":" + applicationSecret)));
    const headers = {
        Authorization: `Basic ${authorization}`,
    };
    return async () => {
        try {
            const bearer = await getAuthorizationCode(headers);
            return createCommands({ applicationId, guildId, commands: commands.map(({ handler, ...c }) => c) }, bearer);
        }
        catch {
            return new Response(JSON.stringify({ error: "Failed to authenticate with Discord. Are the Application ID and secret set correctly?" }), {
                status: 407,
                headers: { "Content-Type": "application/json" },
            });
        }
    };
};
exports.setup = setup;
//# sourceMappingURL=setup.js.map