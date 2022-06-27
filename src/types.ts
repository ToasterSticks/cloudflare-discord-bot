import { APIApplicationCommandInteraction, APIInteractionResponse, APIMessageComponentInteraction } from "discord-api-types/v10";

export type InteractionHandler = (
  interaction: APIApplicationCommandInteraction | APIMessageComponentInteraction,
  ...extra: any
) => Promise<APIInteractionResponse> | APIInteractionResponse;
