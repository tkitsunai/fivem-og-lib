import { FiveMClientNetworkDriver } from "og-core/src/driver/fivemClientNetworkDriver";
import { Location } from "../lib/domain/location";
import { ClientEventUseCase } from "og-core/src/usecase/EventUseCase";
import { PlayerLocationData } from "src/types/event";
import { QBCitizenDriver } from "../lib/driver/qbCitizenDriver";
import { FindCitizenNameUseCase } from "../lib/usecase/findCitizenNameUseCase";
import { QbCitizenGateway } from "../lib/gateway/qbCitizenGateway";
import { CitizenName } from "src/lib/domain/citizen";

// drivers
const fivemNetworkDriver = new FiveMClientNetworkDriver();
const citizenDriver = new QBCitizenDriver();

// gateways
const qbCitizenGateway = new QbCitizenGateway(citizenDriver);

// usecases
const eventUseCase = new ClientEventUseCase("og-gpshub", fivemNetworkDriver);
const findCitizenNameUseCase = new FindCitizenNameUseCase(qbCitizenGateway);

function sendPlayerLocation() {
  const playerId = GetPlayerServerId(PlayerId());
  const coords = GetEntityCoords(PlayerPedId(), true) as [number, number, number];
  eventUseCase.emit("playerLocationUpdate", {
    playerId: playerId.toString(),
    location: toLocationDomain(coords),
  });
}

function toLocationDomain(number: number[]): Location {
  return {
    x: Math.round(number[0]),
    y: Math.round(number[1]),
    z: Math.round(number[2]),
  };
}

setInterval(() => {
  sendPlayerLocation();
}, 3000);

type BlipNumber = number;
type ServerPlayerId = number;

const playerBlips: Map<ServerPlayerId, BlipNumber> = new Map();

eventUseCase.on(
  "broadcastPlayerLocation",
  (serverPlayerId: ServerPlayerId, { playerId, location }: PlayerLocationData) => {
    const citizenName: CitizenName = findCitizenNameUseCase.execute();

    if (playerBlips.has(serverPlayerId)) {
      const blip = playerBlips.get(serverPlayerId);
      if (blip) {
        SetBlipCoords(blip, location.x, location.y, location.z);
      }
    } else {
      const blip = AddBlipForCoord(location.x, location.y, location.z);
      SetBlipSprite(blip, 480);
      SetBlipColour(blip, 2);
      SetBlipScale(blip, 0.8);

      BeginTextCommandSetBlipName("STRING");
      AddTextComponentString([citizenName.firstName, citizenName.lastName].join(" "));
      EndTextCommandSetBlipName(blip);

      playerBlips.set(serverPlayerId, blip);
    }
  }
);
