import { Channel } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";
import { ChannelNotFoundError } from "./errors";
import { Result } from "./result";

export class JoinSessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async execute(
    channel: Channel,
    playerId: PlayerId
  ): Promise<Result<Session, ChannelNotFoundError>> {
    const session = await this.sessionPort.findByChannelId(channel.id);

    if (!session) {
      return {
        success: false,
        error: new ChannelNotFoundError(`channel not found, id: ${channel.id} `),
      };
    }

    const joinedSession = session.join(playerId);
    const saved = await this.sessionPort.save(joinedSession);

    return {
      success: true,
      value: saved,
    };
  }
}
