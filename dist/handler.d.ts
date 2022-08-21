import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIMessageApplicationCommandInteraction, APIMessageComponentInteraction, APIModalSubmitInteraction, APIUserApplicationCommandInteraction, ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { Permissions } from "./permissions";
import { InteractionHandler } from "./types";
export interface Command<T extends ApplicationCommandType.ChatInput | ApplicationCommandType.Message | ApplicationCommandType.User | unknown = unknown> extends RESTPostAPIChatInputApplicationCommandsJSONBody {
    handler: InteractionHandler<T extends ApplicationCommandType.ChatInput ? APIChatInputApplicationCommandInteraction : T extends ApplicationCommandType.Message ? APIMessageApplicationCommandInteraction : T extends ApplicationCommandType.User ? APIUserApplicationCommandInteraction : APIApplicationCommandInteraction>;
    modal?: InteractionHandler<APIModalSubmitInteraction>;
    components?: Record<string, InteractionHandler<APIMessageComponentInteraction>>;
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