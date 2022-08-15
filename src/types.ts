import { APIInteraction, APIInteractionResponse } from "discord-api-types/v10";

export type InteractionHandler<T extends APIInteraction = APIInteraction> = (
  interaction: T,
  ...extra: any
) => Promise<APIInteractionResponse> | APIInteractionResponse;
