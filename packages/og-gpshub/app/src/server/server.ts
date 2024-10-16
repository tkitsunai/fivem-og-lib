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
import { InMemorySessionDriver } from "src/lib/driver/inMemorySessionDriver";
import { FindSessionUseCase } from "src/lib/usecase/findSessionUseCase";

// drivers
const fivemNetworkDriver = new FiveMServerNetworkDriver();
const inMemorySessionDriver = new InMemorySessionDriver();

// gateways
const sessionGateway = new InMemorySessionGateway(inMemorySessionDriver);

// usecases
const eventUseCase = new ServerEventUseCase("og-gpshub", fivemNetworkDriver);
const createSessionUseCase = new CreateSessionUseCase(sessionGateway);
const joinSessionUseCase = new JoinSessionUseCase(sessionGateway);
const leaveSessionUseCase = new LeaveSessionUseCase(sessionGateway);
const findSessionUseCase = new FindSessionUseCase(sessionGateway);

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

eventUseCase.on(Events.create, async (channelId: string) => {
  console.log("playerCreatedSession");

  const channel = {
    id: channelId,
  } as Channel;

  const result = await createSessionUseCase.execute(channel, source as PlayerId);

  console.log("create session: ", result.success);
  if (!result.success) {
    console.error(result.error);
  }
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

eventUseCase.on(Events.leave, async (channelid: string) => {
  console.log("playerLeaveSession");

  const channel = {
    id: channelid,
  } as Channel;

  const result = await leaveSessionUseCase.execute(channel, source as PlayerId);

  if (!result.success) {
    console.error(result.error);
  }
});

eventUseCase.on(Events.status, async () => {
  const results = await findSessionUseCase.findAll();

  if (results.length === 0) {
    console.info("No session found");
  }

  results.forEach((session, idx) => {
    console.info(`session ${idx}: `, session);
  });
});
