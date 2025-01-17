import { Buffer } from "buffer";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import type { Application } from "./handler";

const btoa = (value: string) => Buffer.from(value, "binary").toString("base64");

const getAuthorizationCode = async (headers: any) => {
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

  if (!response.ok) throw new Error("Failed to request an Authorization code.");

  try {
    const data = await response.json();
    return data.access_token;
  } catch {
    throw new Error("Failed to parse the Authorization code response.");
  }
};

const resolveCommandsEndpoint = (applicationId: string, guildId?: string): string => {
  const url = `https://discord.com/api/v8/applications/${applicationId}`;

  if (guildId) {
    return `${url}/guilds/${guildId}/commands`;
  }

  return `${url}/commands`;
};

const createCommands = async (
  {
    applicationId,
    guildId,
    commands,
  }: {
    applicationId: string;
    guildId?: string;
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[];
  },
  bearer: any
): Promise<Response> => {
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

export const setup = ({ applicationId, applicationSecret, guildId, commands }: Application) => {
  const authorization = btoa(unescape(encodeURIComponent(applicationId + ":" + applicationSecret)));

  const headers = {
    Authorization: `Basic ${authorization}`,
  };

  return async (): Promise<Response> => {
    try {
      const bearer = await getAuthorizationCode(headers);

      return createCommands({ applicationId, guildId, commands: commands.map(({ handler, components, ...c }) => c) }, bearer);
    } catch {
      return new Response(JSON.stringify({ error: "Failed to authenticate with Discord. Are the Application ID and secret set correctly?" }), {
        status: 407,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
};
