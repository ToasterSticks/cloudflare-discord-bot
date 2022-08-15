import { APIInteraction } from "discord-api-types/v10";
import { InteractionHandler } from "./types";
import type { CommandStore } from "./handler";
export declare const interaction: ({ publicKey, commands }: {
    publicKey: string;
    commands: CommandStore;
    components?: {
        [key: string]: InteractionHandler<APIInteraction>;
    } | undefined;
}) => (request: Request, ...extra: any) => Promise<Response>;
//# sourceMappingURL=interaction.d.ts.map