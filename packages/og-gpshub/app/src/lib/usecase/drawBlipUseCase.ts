import { BlipNumber } from "../domain/blip";
import { PlayerLocation } from "../domain/location";
import { PlayerInfo } from "../domain/player";
import { BlipPort } from "../port/blipPort";

export class DrawBlipUseCase {
  constructor(private blipPort: BlipPort) {}

  async execute(blip: BlipNumber, location: PlayerLocation, player: PlayerInfo): Promise<void> {
    return await this.blipPort.drawBlip(blip, location, player);
  }
}
