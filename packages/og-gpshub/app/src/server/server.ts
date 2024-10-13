import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { SessionUseCase } from "../lib/usecase/sessionUseCase";
import { FiveMNetworkDriver } from "og-core/src/driver/fivemNetworkDriver";
import { ChannelId } from "../lib/domain/channel";
import { PlayerId } from "../lib/domain/player";
import { EventUseCase } from "../lib/usecase/eventUseCase";

// drivers
const fivemNetworkDriver = new FiveMNetworkDriver();

// gateways
const sessionGateway = new InMemorySessionGateway();

// usecases
const sessionUseCase = new SessionUseCase(sessionGateway);
const eventUseCase = new EventUseCase(fivemNetworkDriver);

eventUseCase.on(
  "og-gpshub:join",
  async (
    channelId: ChannelId,
    playerId: PlayerId,
    location: { x: number; y: number; z: number }
  ) => {
    console.log("og-gpshub:join event handler", channelId, playerId, location);
    try {
      await sessionUseCase.join(channelId as ChannelId, playerId as PlayerId, location);
    } catch (error: any) {
      console.error(`Error joining session: ${error.message}`);
    }
  }
);
