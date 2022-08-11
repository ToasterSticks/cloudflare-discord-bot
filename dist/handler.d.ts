import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { Permissions } from "./permissions";
import { InteractionHandler } from "./types";
declare type Command = RESTPostAPIChatInputApplicationCommandsJSONBody & {
    handler: InteractionHandler;
};
export declare type Application = {
    applicationId: string;
    applicationSecret: string;
    publicKey: string;
    guildId?: string;
    commands: Command[];
    components?: {
        [key: string]: InteractionHandler;
    };
    permissions?: Permissions;
};
export declare type CommandStore = Map<string, Command>;
export declare const createApplicationCommandHandler: (application: Application) => (request: import("itty-router").Request, ...extra: any) => Promise<any>;
export {};
//# sourceMappingURL=handler.d.ts.map