import { FiveMClientNetworkDriver } from "og-core/src/driver/fivemClientNetworkDriver";
import { ClientEventUseCase } from "og-core/src/usecase/EventUseCase";
import { Events } from "@/src/constants/events";
import { RegisterCommands } from "../constants/commands";
import { BlipGateway } from "../lib/gateway/blipGateway";
import { Locate } from "./locaters";
import { FindPlayerUseCase } from "../lib/usecase/findPlayerUseCase";
import { FiveMPlayerGateway } from "../lib/gateway/fivemPlayerGateway";
import { BlipUseCase } from "../lib/usecase/blipUseCase";
import { Suggest } from "./suggest";

// drivers
const fivemNetworkDriver = new FiveMClientNetworkDriver();

// gateways
const blipGateway = new BlipGateway();
const playerGateway = new FiveMPlayerGateway();

// usecases
const eventUseCase = new ClientEventUseCase("og-gpshub", fivemNetworkDriver);
const blipUseCase = new BlipUseCase(blipGateway);
const findPlayerUseCase = new FindPlayerUseCase(playerGateway);

// Application Services
new Locate(eventUseCase, findPlayerUseCase, blipUseCase);
new Suggest();

const ClientEventMap = {
  join: Events.join,
  create: Events.create,
  leave: Events.leave,
  help: "og_gpshub:help",
  status: Events.status,
  locate: Events.recordLocation,
} as const;

type ClientEventKey = keyof typeof ClientEventMap;

function localEmitter(eventName: string, ...args: any[]) {
  emit(eventName, ...args);
}

function emitCommand(source: number, args: string[], rawCommand: string) {
  console.log(rawCommand);
  const commandNameArgs: ClientEventKey = (args[0] || "help") as ClientEventKey;

  switch (commandNameArgs) {
    case "help":
      localEmitter("og_gpshub:help");
      return;
    default:
      break;
  }

  const commandName = ClientEventMap[commandNameArgs];
  console.log("Server EventTrigger: ", commandName);
  eventUseCase.emitToServer(commandName, args.slice(1));
}

RegisterCommand(RegisterCommands.ogadmin, emitCommand, false);

on("og_gpshub:help", () => {
  const keys = Object.keys(ClientEventMap) as ClientEventKey[];

  keys.forEach((key: ClientEventKey) => {
    TriggerEvent("chat:addMessage", {
      color: [0, 0, 0],
      multiline: true,
      args: ["[OG-GPSHUB]", `/ogAdmin ${key}`],
    });
  });
});
