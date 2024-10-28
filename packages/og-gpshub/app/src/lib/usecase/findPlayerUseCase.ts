import { PlayerId, Player, PlayerServerId } from "../domain/player";
import { PlayerPort } from "../port/playerPort";

export class FindPlayerUseCase {
  constructor(private readonly playerPort: PlayerPort) {}

  findPlayer(id: PlayerId): Player | null {
    const player = this.playerPort.getPlayer(id);

    if (!player) {
      return null;
    }

    return {
      id: player.id,
      name: player.name,
    };
  }
}
