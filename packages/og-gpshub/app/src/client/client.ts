import { FiveMNetworkDriver } from "og-core/src/driver/fivemNetworkDriver";
import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { SessionUseCase } from "../lib/usecase/sessionUseCase";
import { ChannelId } from "../lib/domain/channel";
import { Location } from "../lib/domain/location";
import { EventUseCase } from "../lib/usecase/eventUseCase";

// drivers
const fivemNetworkDriver = new FiveMNetworkDriver();

// gateways
const sessionGateway = new InMemorySessionGateway();

// usecases
const sessionUseCase = new SessionUseCase(sessionGateway);
const eventUseCase = new EventUseCase(fivemNetworkDriver);

function joinSession(channelId: string) {
  const playerId = GetPlayerServerId(PlayerId());
  const coords = GetEntityCoords(PlayerPedId(), true);
  const locate = toLocationDomain(coords);
  console.log("joinSession", channelId, playerId, coords);
  sessionUseCase.join(channelId as ChannelId, playerId.toString(), locate);
}

function toLocationDomain(number: number[]): Location {
  return {
    x: Math.round(number[0]),
    y: Math.round(number[1]),
    z: Math.round(number[2]),
  };
}

setTick(() => {
  joinSession("test");
});

// 位置情報を受け取る
eventUseCase.on("og-gpshub:receiveLocate", (locate: Location) => {
  console.log("receiveLocate", locate);
});
