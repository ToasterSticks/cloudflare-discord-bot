import { APIInteraction, APIInteractionResponse } from "discord-api-types/v10";
export declare type InteractionHandler<T extends APIInteraction = APIInteraction> = (interaction: T, ...extra: any) => Promise<APIInteractionResponse> | APIInteractionResponse;
//# sourceMappingURL=types.d.ts.map