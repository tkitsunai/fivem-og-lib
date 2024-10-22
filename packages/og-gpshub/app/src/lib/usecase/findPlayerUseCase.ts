import { PlayerId, PlayerInfo } from "../domain/player";
import { PlayerPort } from "../port/playerPort";

export class FindPlayerUseCase {
  constructor(private readonly playerPort: PlayerPort) {}

  findPlayer(playerId: PlayerId): PlayerInfo | null {
    const player = this.playerPort.getPlayer(playerId);

    if (!player) {
      return null;
    }

    return {
      id: player.id,
      name: player.name,
    };
  }
}
