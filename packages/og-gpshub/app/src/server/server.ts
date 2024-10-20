import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { FiveMServerNetworkDriver } from "og-core/src/driver/fivemServerNetworkDriver";
import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { CreateSessionUseCase } from "src/lib/usecase/createSessionUseCase";
import { JoinSessionUseCase } from "src/lib/usecase/joinSessionUseCase";
import { Channel, ChannelId, isValidChannel } from "src/lib/domain/channel";
import { PlayerId } from "src/lib/domain/player";
import { LeaveSessionUseCase } from "src/lib/usecase/leaveSessionUseCase";
import { Events } from "src/constants/events";
import { InMemorySessionDriver } from "src/lib/driver/inMemorySessionDriver";
import { FindSessionUseCase } from "src/lib/usecase/findSessionUseCase";
import { QbCitizenGateway } from "@/src/lib/gateway/qbCitizenGateway";
import { ServerQBDriver } from "@/src/lib/driver/qbDriver";
import { FindCitizenUseCase } from "../lib/usecase/findCitizenNameUseCase";
import { PlayerLocation } from "@/src/lib/domain/location";
import { serversQBCore } from "@/src/lib/driver/qbCore";
import { UpdatePlayerLocationUseCase } from "../lib/usecase/updatePlayerLocationUseCase";
import { InMemoryPlayerLocationGateway } from "../lib/gateway/inMemoryPlayerLocationGateway";
import { InMemoryPlayerLocationDriver } from "../lib/driver/inMemoryPlayerLocation";
import { StatusEventHandler } from "./status";
import { FindPlayerLocationUseCase } from "../lib/usecase/findPlayerLocationUseCase";
import { Broadcast } from "./broadcast";

// drivers
const fivemNetworkDriver = new FiveMServerNetworkDriver();
const inMemorySessionDriver = new InMemorySessionDriver();
const qbCitizenDriver = new ServerQBDriver(serversQBCore);
const inMemoryPlayerLocationDriver = new InMemoryPlayerLocationDriver();

// gateways
const sessionGateway = new InMemorySessionGateway(inMemorySessionDriver);
const citizenGateway = new QbCitizenGateway(qbCitizenDriver);
const locationGateway = new InMemoryPlayerLocationGateway(inMemoryPlayerLocationDriver);

// usecases
const eventUseCase = new ServerEventUseCase("og-gpshub", fivemNetworkDriver);
const createSessionUseCase = new CreateSessionUseCase(sessionGateway);
const joinSessionUseCase = new JoinSessionUseCase(sessionGateway);
const leaveSessionUseCase = new LeaveSessionUseCase(sessionGateway);
const findSessionUseCase = new FindSessionUseCase(sessionGateway);
const findCitizenUseCase = new FindCitizenUseCase(citizenGateway);
const updateLocationUseCase = new UpdatePlayerLocationUseCase(locationGateway, sessionGateway);
const findPlayerLocationUseCase = new FindPlayerLocationUseCase(locationGateway, sessionGateway);

// eventUseCase.on("playerLocationUpdate", ({ playerId, location }: PlayerLocationData) => {
//   if (!playerId || !location) {
//     console.error("Invalid playerId or location:", { playerId, location });
//     return;
//   }
//   const playerServerId = source;

//   eventUseCase.emit("broadcastPlayerLocation", playerServerId, playerServerId, {
//     playerId,
//     location,
//   });
// });

eventUseCase.on(Events.create, async (channelId: string) => {
  console.log("playerCreatedSession");

  const channel = {
    id: channelId,
  } as Channel;

  if (!isValidChannel(channel)) {
    console.error("Invalid channel name:");
    return;
  }

  const result = await createSessionUseCase.execute(channel, source as PlayerId);

  if (!result.success) {
    console.error(result.error);
  }

  console.log("create session:", result.success);
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

eventUseCase.on(Events.recordLocation, async (location: PlayerLocation) => {
  const citizen = findCitizenUseCase.findCitizen();

  const result = await updateLocationUseCase.execute(source as PlayerId, citizen.id, location);

  if (!result.success) {
    console.error(result.error);
    return;
  }

  eventUseCase.emit(Events.broadcast, result.value);
});

new StatusEventHandler(eventUseCase, findSessionUseCase, findPlayerLocationUseCase);
new Broadcast(eventUseCase, findSessionUseCase, findPlayerLocationUseCase);
