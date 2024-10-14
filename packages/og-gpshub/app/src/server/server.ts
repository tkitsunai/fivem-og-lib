import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { FiveMServerNetworkDriver } from "og-core/src/driver/fivemServerNetworkDriver";
import { PlayerLocationData } from "../types/event";
import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { CreateSessionUseCase } from "../lib/usecase/createSessionUseCase";
import { JoinSessionUseCase } from "../lib/usecase/joinSessionUseCase";
import { Channel } from "../lib/domain/channel";
import { PlayerId } from "src/lib/domain/player";

// drivers
const fivemNetworkDriver = new FiveMServerNetworkDriver();

// gateways
const sessionGateway = new InMemorySessionGateway();

// usecases
const eventUseCase = new ServerEventUseCase("og-gpshub", fivemNetworkDriver);
const createSessionUseCase = new CreateSessionUseCase(sessionGateway);
const joinSessionUseCase = new JoinSessionUseCase(sessionGateway);

eventUseCase.on("playerLocationUpdate", ({ playerId, location }: PlayerLocationData) => {
  if (!playerId || !location) {
    console.error("Invalid playerId or location:", { playerId, location });
    return;
  }
  const playerServerId = source;

  eventUseCase.emit("broadcastPlayerLocation", playerServerId, playerServerId, {
    playerId,
    location,
  });
});

eventUseCase.on("playerCreatedSession", (channelId: string) => {
  console.log("playerCreatedSession");

  const channel = {
    id: channelId,
  } as Channel;

  createSessionUseCase.execute(channel, source as PlayerId);
});

eventUseCase.on("playerJoinToSession", (channelid: string) => {
  console.log("playerJoinToSession");

  const channel = {
    id: channelid,
  } as Channel;

  joinSessionUseCase.execute(channel, source as PlayerId);
});
