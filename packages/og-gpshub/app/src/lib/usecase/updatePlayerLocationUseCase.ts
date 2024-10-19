import { Channel } from "../domain/channel";
import { CitizenId } from "../domain/citizen";
import { PlayerLocation } from "../domain/location";
import { PlayerId } from "../domain/player";
import { LocationPort } from "../port/locationPort";
import { SessionPort } from "../port/sessionPort";
import { PlayerHasNotJoinedError } from "./errors";
import { Result } from "./result";

export class UpdatePlayerLocationUseCase {
  constructor(
    private readonly locationPort: LocationPort,
    private readonly sessionPort: SessionPort
  ) {}

  async execute(
    playerId: PlayerId,
    citizenId: CitizenId,
    location: PlayerLocation
  ): Promise<Result<Channel, PlayerHasNotJoinedError>> {
    const channel = await this.sessionPort.findByPlayerId(playerId);
    if (!channel) {
      return {
        success: false,
        error: new PlayerHasNotJoinedError(),
      };
    }

    await this.locationPort.savePlayerLocation(citizenId, location);
    return {
      success: true,
      value: channel.sessionInfo.channel,
    };
  }
}
