import { PlayerId, PlayerInfo, PlayerPed } from "../domain/player";

export interface PlayerPort {
  getPlayer(playerId: PlayerId): PlayerInfo | null;
}
