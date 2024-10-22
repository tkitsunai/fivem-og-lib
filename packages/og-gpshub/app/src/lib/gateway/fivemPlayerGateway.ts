import { PlayerInfo, PlayerName, PlayerServerId } from "../domain/player";
import { PlayerPort } from "../port/playerPort";

export class FiveMPlayerGateway implements PlayerPort {
  getPlayer(playerId: PlayerServerId): PlayerInfo | null {
    const serverPlayerId = GetPlayerFromServerId(playerId);
    const name = GetPlayerName(serverPlayerId);
    return { id: playerId, name: PlayerName.fromSingleName(name) } as PlayerInfo;
  }
}
