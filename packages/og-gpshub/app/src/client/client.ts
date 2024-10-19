import { FiveMClientNetworkDriver } from "og-core/src/driver/fivemClientNetworkDriver";
import { PlayerLocation } from "../lib/domain/location";
import { ClientEventUseCase } from "og-core/src/usecase/EventUseCase";
import { Events } from "@/src/constants/events";
import { RegisterCommands, SuggestionCommands } from "../constants/commands";
import { PlayerId as PlayerIdDomain } from "@/src/lib/domain/player";

// drivers
const fivemNetworkDriver = new FiveMClientNetworkDriver();

// usecases
const eventUseCase = new ClientEventUseCase("og-gpshub", fivemNetworkDriver);

function sendPlayerLocation() {
  const playerId = GetPlayerServerId(PlayerId());
  const coords = GetEntityCoords(PlayerPedId(), true) as [number, number, number];
  eventUseCase.emitToServer("playerLocationUpdate", {
    playerId: playerId.toString(),
    location: toLocationDomain(coords),
  });
}

function toLocationDomain(number: number[]): PlayerLocation {
  return {
    x: Math.round(number[0]),
    y: Math.round(number[1]),
    z: Math.round(number[2]),
  };
}

setInterval(() => {
  //  sendPlayerLocation();
}, 3000);

type BlipNumber = number;
type ServerPlayerId = number;

const playerBlips: Map<ServerPlayerId, BlipNumber> = new Map();

const localPlayerLocation: Map<PlayerIdDomain, Location> = new Map();

// eventUseCase.on(
//   "broadcastPlayerLocation",
//   (serverPlayerId: ServerPlayerId, { playerId, location }: PlayerLocationData) => {
//     const citizenName: Citizen = findCitizenNameUseCase.findCitizen();

//     if (playerBlips.has(serverPlayerId)) {
//       const blip = playerBlips.get(serverPlayerId);
//       if (blip) {
//         SetBlipCoords(blip, location.x, location.y, location.z);
//       }
//     } else {
//       const blip = AddBlipForCoord(location.x, location.y, location.z);
//       SetBlipSprite(blip, 480);
//       SetBlipColour(blip, 2);
//       SetBlipScale(blip, 0.8);

//       BeginTextCommandSetBlipName("STRING");
//       AddTextComponentString([citizenName.firstName, citizenName.lastName].join(" "));
//       EndTextCommandSetBlipName(blip);

//       playerBlips.set(serverPlayerId, blip);
//     }
//   }
// );

const ClientEventMap = {
  join: Events.join,
  create: Events.create,
  leave: Events.leave,
  help: "og_gpshub:help",
  status: Events.status,
  locate: "og_gpshub:locate",
} as const;

type ClientEventKey = keyof typeof ClientEventMap;

function localEmitter(eventName: string, ...args: any[]) {
  emit(eventName, ...args);
}

function emitCommand(source: number, args: string[], rawCommand: string) {
  console.log(rawCommand);
  const commandNameArgs: ClientEventKey = (args[0] || "help") as ClientEventKey;

  switch (commandNameArgs) {
    case "locate":
      localEmitter("og_gpshub:locate");
      return;
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

on("og_gpshub:locate", () => {
  const coords = GetEntityCoords(PlayerPedId(), true) as [number, number, number];
  const playerLocation = toLocationDomain(coords);
  console.log("find your location:", playerLocation);
  eventUseCase.emitToServer(Events.recordLocation, {
    location: playerLocation,
  });
});

Object.values(SuggestionCommands).forEach((suggestion) => {
  TriggerEvent(
    "chat:addSuggestion",
    suggestion.command,
    suggestion.description,
    suggestion.args || []
  );
});
