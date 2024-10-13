import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { SessionUseCase } from "../lib/usecase/sessionUseCase";
import { FiveMServerNetworkDriver } from "og-core/src/driver/fivemServerNetworkDriver";
import { PlayerLocationEventData } from "../types/events";
import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";

// drivers
const fivemNetworkDriver = new FiveMServerNetworkDriver();

// gateways
const sessionGateway = new InMemorySessionGateway();

// usecases
const sessionUseCase = new SessionUseCase(sessionGateway);
const eventUseCase = new ServerEventUseCase("og-gpshub", fivemNetworkDriver);

eventUseCase.on("playerLocationUpdate", ({ playerId, location }: PlayerLocationEventData) => {
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
