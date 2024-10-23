import { Player, PlayerName, PlayerServerId } from "../domain/player";
import { PlayerPort } from "../port/playerPort";

export class NativeClientPlayerGateway implements PlayerPort {
  getPlayer(playerId: PlayerServerId): Player | null {
    const serverPlayerId = GetPlayerFromServerId(playerId);
    const name = GetPlayerName(serverPlayerId);
    return { id: playerId, name: PlayerName.fromSingleName(name) } as Player;
  }
}

export class NativeServerPlayerGateway implements PlayerPort {
  getPlayer(playerId: PlayerServerId): Player | null {
    const name = GetPlayerName(playerId);
    return { id: playerId, name: PlayerName.fromSingleName(name) } as Player;
  }
}
