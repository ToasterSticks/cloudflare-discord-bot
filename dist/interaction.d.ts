import { InteractionHandler } from "./types";
import type { DictCommands } from "./handler";
export declare const interaction: ({ publicKey, commands, components, }: {
    publicKey: string;
    commands: DictCommands;
    components?: {
        [key: string]: InteractionHandler;
    } | undefined;
}) => (request: Request, ...extra: any) => Promise<Response>;
//# sourceMappingURL=interaction.d.ts.map