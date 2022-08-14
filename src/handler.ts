import { Router } from "itty-router";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { setup } from "./setup";
import { authorize } from "./authorize";
import { interaction } from "./interaction";
import { Permissions } from "./permissions";
import { InteractionHandler } from "./types";

const router = Router();

export type Command = RESTPostAPIChatInputApplicationCommandsJSONBody & {
  handler: InteractionHandler;
  components?: Record<string, InteractionHandler>;
};

export type Application = {
  applicationId: string;
  applicationSecret: string;
  publicKey: string;
  guildId?: string;
  commands: Command[];
  permissions?: Permissions;
};

export type CommandStore = Map<string, Command>;

export const createApplicationCommandHandler = (application: Application) => {
  router.get("/", authorize(application.applicationId, application.permissions));
  const commands = application.commands.reduce((_commands, command) => _commands.set(command.name, command), <CommandStore>new Map());
  router.post("/interaction", interaction({ publicKey: application.publicKey, commands }));
  router.get("/setup", setup(application));
  return router.handle;
};
