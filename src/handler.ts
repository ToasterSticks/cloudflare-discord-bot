import { Router } from "itty-router";
import {
  APIApplicationCommandInteraction,
  APIChatInputApplicationCommandInteraction,
  APIContextMenuInteraction,
  APIMessageComponentInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord-api-types/v10";
import { setup } from "./setup";
import { authorize } from "./authorize";
import { interaction } from "./interaction";
import { Permissions } from "./permissions";
import { InteractionHandler } from "./types";

const router = Router();

export interface Command<T extends "ChatInput" | "ContextMenu" | unknown = unknown> extends RESTPostAPIChatInputApplicationCommandsJSONBody {
  handler: InteractionHandler<
    T extends "ChatInput" ? APIChatInputApplicationCommandInteraction : T extends "ContextMenu" ? APIContextMenuInteraction : APIApplicationCommandInteraction
  >;
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

export type CommandStore = Map<string, Command>;

export const createApplicationCommandHandler = (application: Application) => {
  router.get("/", authorize(application.applicationId, application.permissions));
  const commands = application.commands.reduce((_commands, command) => _commands.set(command.name, command), <CommandStore>new Map());
  router.post("/interaction", interaction({ publicKey: application.publicKey, commands }));
  router.get("/setup", setup(application));
  return router.handle;
};
