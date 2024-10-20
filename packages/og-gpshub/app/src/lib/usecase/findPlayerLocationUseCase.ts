import { ChannelId } from "../domain/channel";
import { PlayerAndLocations, PlayerLocation } from "../domain/location";
import { LocationPort } from "../port/locationPort";
import { SessionPort } from "../port/sessionPort";
import { ChannelNotFoundError } from "./errors";
import { Result } from "./result";

export class FindPlayerLocationUseCase {
  constructor(
    private readonly locationPort: LocationPort,
    private readonly sessionPort: SessionPort
  ) {}

  async findAll(): Promise<PlayerLocation[]> {
    return await this.locationPort.findAll();
  }

  async findByChannelId(
    channelId: ChannelId
  ): Promise<Result<PlayerAndLocations[], ChannelNotFoundError>> {
    const session = await this.sessionPort.findByChannelId(channelId);

    if (!session) {
      return {
        success: false,
        error: new ChannelNotFoundError(),
      };
    }

    return {
      success: true,
      value: await this.locationPort.findPlayerLocatoios(session.findAllPlayers()),
    };
  }
}
