import {
  CitizenId,
  PlayerId,
  Player,
  PlayerName,
  PlayerServerId,
  isCitizenId,
} from "../domain/player";
import { ServerQBDriver } from "../driver/qbDriver";
import { PlayerPort } from "../port/playerPort";

export class QbCitizenGateway implements PlayerPort {
  constructor(private readonly qbDriver: ServerQBDriver) {}

  getPlayer(playerId: PlayerId): Player | null {
    const isCitizen = isCitizenId(playerId);

    if (isCitizen) {
      const citizen = this.qbDriver.getPlayerDataByCitizen(playerId as CitizenId);

      return citizen
        ? {
            id: playerId as CitizenId,
            name: PlayerName.fromFullName(
              citizen.PlayerData.charinfo.firstname,
              citizen.PlayerData.charinfo.lastname
            ),
          }
        : null;
    }

    const qbPlayerData = this.qbDriver.getPlayerData(playerId as PlayerServerId);

    return qbPlayerData
      ? {
          id: qbPlayerData.PlayerData.citizenid as CitizenId,
          name: PlayerName.fromFullName(
            qbPlayerData.PlayerData.charinfo.firstname,
            qbPlayerData.PlayerData.charinfo.lastname
          ),
        }
      : null;
  }
}
