import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";
import { PlayerHasNotJoinedError, SessionNotFoundError } from "./errors";
import { Result } from "./result";

export class FindSessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async findAll(): Promise<Session[]> {
    const results = await this.sessionPort.findAll();
    return results;
  }

  async findByPlayerId(playerId: PlayerId): Promise<Result<Session, PlayerHasNotJoinedError>> {
    // TODO: plz debug this
    const found = await this.sessionPort.findByPlayerId(playerId);
    if (!found) {
      return {
        success: false,
        error: new PlayerHasNotJoinedError(),
      };
    }

    return {
      success: true,
      value: found,
    };
  }

  async findByChannelId(channelId: ChannelId): Promise<Result<Session, SessionNotFoundError>> {
    const session = await this.sessionPort.findByChannelId(channelId);

    if (!session) {
      return {
        success: false,
        error: new SessionNotFoundError(),
      };
    }

    return {
      success: true,
      value: session,
    };
  }
}
