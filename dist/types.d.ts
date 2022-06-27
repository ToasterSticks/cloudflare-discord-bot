import { APIApplicationCommandInteraction, APIInteractionResponse, APIMessageComponentInteraction } from "discord-api-types/v10";
export declare type InteractionHandler = (interaction: APIApplicationCommandInteraction | APIMessageComponentInteraction, ...extra: any) => Promise<APIInteractionResponse> | APIInteractionResponse;
//# sourceMappingURL=types.d.ts.map