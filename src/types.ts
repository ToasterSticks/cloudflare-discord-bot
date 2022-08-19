import { APIInteraction, APIInteractionResponse } from "discord-api-types/v10";

interface File {
  name: string;
  data: string;
}

export type InteractionHandlerReturn = APIInteractionResponse & {
  files?: File[];
};

export type InteractionHandler<T extends APIInteraction = APIInteraction> = (
  interaction: T,
  ...extra: any
) => InteractionHandlerReturn | Promise<InteractionHandlerReturn>;
