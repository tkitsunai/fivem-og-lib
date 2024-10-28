import { PlayerId, Player } from "../domain/player";

export interface PlayerPort {
  getPlayer(playerId: PlayerId): Player | null;
}
