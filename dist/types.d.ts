import { APIInteraction, APIInteractionResponse } from "discord-api-types/v10";
export interface File {
    name: string;
    data: any;
}
export declare type InteractionHandlerReturn = APIInteractionResponse & {
    files?: File[];
};
export declare type InteractionHandler<T extends APIInteraction = APIInteraction> = (interaction: T, ...extra: any) => InteractionHandlerReturn | Promise<InteractionHandlerReturn>;
//# sourceMappingURL=types.d.ts.map