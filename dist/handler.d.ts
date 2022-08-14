import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { Permissions } from "./permissions";
import { InteractionHandler } from "./types";
export interface Command extends RESTPostAPIChatInputApplicationCommandsJSONBody {
    handler: InteractionHandler;
    components?: Record<string, InteractionHandler>;
}
export interface Application {
    applicationId: string;
    applicationSecret: string;
    publicKey: string;
    guildId?: string;
    commands: Command[];
    permissions?: Permissions;
}
export declare type CommandStore = Map<string, Command>;
export declare const createApplicationCommandHandler: (application: Application) => (request: import("itty-router").Request, ...extra: any) => Promise<any>;
//# sourceMappingURL=handler.d.ts.map