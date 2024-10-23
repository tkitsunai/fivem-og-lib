import { CitizenId, PlayerId, Player, PlayerName, PlayerServerId } from "../domain/player";
import { ServerQBDriver } from "../driver/qbDriver";
import { PlayerPort } from "../port/playerPort";

export class QbCitizenGateway implements PlayerPort {
  constructor(private readonly qbDriver: ServerQBDriver) {}

  getPlayer(playerId: PlayerId): Player | null {
    const { PlayerData } = this.qbDriver.getPlayerData(playerId as PlayerServerId);

    return {
      id: PlayerData.citizenid as CitizenId,
      name: PlayerName.fromFullName(PlayerData.charinfo.firstname, PlayerData.charinfo.lastname),
    } as Player;
  }
}
