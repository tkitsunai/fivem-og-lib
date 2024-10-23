import { Blip, BlipNumber } from "../domain/blip";
import { Player } from "../domain/player";

export interface BlipPort {
  createBlipForPlayer(playerInfo: Player): Blip;
  removeBlip(blip: BlipNumber): void;
}
