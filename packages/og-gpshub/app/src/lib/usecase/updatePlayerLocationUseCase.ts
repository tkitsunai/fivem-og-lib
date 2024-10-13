import { PlayerId } from "../domain/player";
import { SessionPort } from "../port/sessionPort";
import { Location } from "../domain/location";

export class UpdatePlayerLocationUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async execute(playerId: PlayerId, location: Location) {
    const session = await this.sessionPort.findByPlayerId(playerId);

    if (!session) {
      throw new Error(`Session not found for player ${playerId}`);
    }

    const updatedSession = session.updatePlayerLocation(playerId, location);

    this.sessionPort.save(updatedSession);
  }
}
