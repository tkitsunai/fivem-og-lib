import { Blip, BlipNumber } from "../domain/blip";
import { PlayerInfo } from "../domain/player";

export interface BlipPort {
  createBlipForPlayer(playerInfo: PlayerInfo): Blip;
  removeBlip(blip: BlipNumber): void;
}
