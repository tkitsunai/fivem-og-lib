import { Blip, BlipNumber } from "../domain/blip";
import { PlayerInfo } from "../domain/player";
import { BlipPort } from "../port/blipPort";

export class BlipUseCase {
  constructor(private blipPort: BlipPort) {}

  createBlipForPlayer(players: PlayerInfo[]): Blip[] {
    return players.map((player) => {
      return this.blipPort.createBlipForPlayer(player);
    });
  }

  removeBlip(blip: BlipNumber): void {
    this.blipPort.removeBlip(blip);
  }
}
