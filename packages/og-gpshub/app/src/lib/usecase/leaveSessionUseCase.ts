import { Channel } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";
import { ChannelNotFoundError } from "./errors";
import { Result } from "./result";

export class LeaveSessionUseCase {
  constructor(private sessionPort: SessionPort) {}

  async execute(
    channel: Channel,
    playerId: PlayerId
  ): Promise<Result<Session, ChannelNotFoundError>> {
    const session = await this.sessionPort.findByChannelId(channel.id);

    if (!session) {
      return {
        success: false,
        error: new ChannelNotFoundError(channel.id),
      };
    }

    const leavedSession = session.leave(playerId);

    if (!leavedSession.hasPlayer()) {
      await this.sessionPort.deleteByChannelId(channel.id);
      return {
        success: true,
        value: leavedSession,
      };
    }

    return {
      success: true,
      value: await this.sessionPort.save(leavedSession),
    };
  }
}
