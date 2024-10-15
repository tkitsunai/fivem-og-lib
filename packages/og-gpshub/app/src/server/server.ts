import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { FiveMServerNetworkDriver } from "og-core/src/driver/fivemServerNetworkDriver";
import { PlayerLocationData } from "src/types/event";
import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { CreateSessionUseCase } from "src/lib/usecase/createSessionUseCase";
import { JoinSessionUseCase } from "src/lib/usecase/joinSessionUseCase";
import { Channel } from "src/lib/domain/channel";
import { PlayerId } from "src/lib/domain/player";
import { LeaveSessionUseCase } from "src/lib/usecase/leaveSessionUseCase";
import { Events } from "src/constants/events";
import { QBDriver } from "src/lib/driver/qbWrapperDriver";

// drivers
const fivemNetworkDriver = new FiveMServerNetworkDriver();

// gateways
const sessionGateway = new InMemorySessionGateway();

// usecases
const eventUseCase = new ServerEventUseCase("og-gpshub", fivemNetworkDriver);
const createSessionUseCase = new CreateSessionUseCase(sessionGateway);
const joinSessionUseCase = new JoinSessionUseCase(sessionGateway);
const leaveSessionUseCase = new LeaveSessionUseCase(sessionGateway);

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

eventUseCase.on(Events.create, (channelId: string) => {
  console.log("playerCreatedSession");

  const channel = {
    id: channelId,
  } as Channel;

  createSessionUseCase.execute(channel, source as PlayerId);
});

eventUseCase.on(Events.join, async (channelid: string) => {
  console.log("playerJoinToSession");

  const channel = {
    id: channelid,
  } as Channel;

  const result = await joinSessionUseCase.execute(channel, source as PlayerId);

  // TODO: feedback to player
  if (!result.success) {
    console.error(result.error);
  }
  console.info("join to chennel session");
});

eventUseCase.on(Events.leave, (channelid: string) => {
  console.log("playerLeaveSession");

  const channel = {
    id: channelid,
  } as Channel;

  leaveSessionUseCase.execute(channel, source as PlayerId);
});
