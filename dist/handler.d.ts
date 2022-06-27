import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { Permissions } from "./permissions";
import { InteractionHandler } from "./types";
export declare type Application = {
    applicationId: string;
    applicationSecret: string;
    publicKey: string;
    guildId?: string;
    commands: [RESTPostAPIChatInputApplicationCommandsJSONBody, InteractionHandler][];
    components?: {
        [key: string]: InteractionHandler;
    };
    permissions: Permissions;
};
export declare type DictCommands = Record<string, {
    command: RESTPostAPIChatInputApplicationCommandsJSONBody;
    handler: InteractionHandler;
}>;
export declare const createApplicationCommandHandler: (application: Application) => (request: import("itty-router").Request, ...extra: any) => Promise<any>;
//# sourceMappingURL=handler.d.ts.map