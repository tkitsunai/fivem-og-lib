import { PlayerId, Player, PlayerPed } from "../domain/player";

export interface PlayerPort {
  getPlayer(playerId: PlayerId): Player | null;
}
