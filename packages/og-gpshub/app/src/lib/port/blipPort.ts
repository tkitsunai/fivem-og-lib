import { BlipNumber } from "../domain/blip";
import { PlayerLocation } from "../domain/location";
import { PlayerId, PlayerInfo } from "../domain/player";

export interface BlipPort {
  findBlipByPlayerId(playerId: PlayerId): Promise<BlipNumber>;
  drawBlip(blip: BlipNumber, PlayerLocation: PlayerLocation, player: PlayerInfo): Promise<void>;
}
