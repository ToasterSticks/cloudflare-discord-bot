import { InteractionHandler } from "./types";
import type { CommandStore } from "./handler";
export declare const interaction: ({ publicKey, commands }: {
    publicKey: string;
    commands: CommandStore;
    components?: {
        [key: string]: InteractionHandler;
    } | undefined;
}) => (request: Request, ...extra: any) => Promise<Response>;
//# sourceMappingURL=interaction.d.ts.map