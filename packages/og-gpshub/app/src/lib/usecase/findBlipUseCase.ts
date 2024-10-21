import { BlipNumber } from "../domain/blip";
import { PlayerId } from "../domain/player";
import { BlipPort } from "../port/blipPort";

export class FindBlipUseCase {
  constructor(private readonly blipPort: BlipPort) {}

  async execute(playerId: PlayerId): Promise<BlipNumber> {
    return await this.blipPort.findBlipByPlayerId(playerId);
  }
}
