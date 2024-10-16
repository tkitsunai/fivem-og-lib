import { Channel } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";
import { AlreadyExistsSession } from "./errors";
import { Result } from "./result";

export class CreateSessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async execute(
    channel: Channel,
    playerId: PlayerId
  ): Promise<Result<Session, AlreadyExistsSession>> {
    const foundSession = await this.sessionPort.findByChannelId(channel.id);

    if (foundSession) {
      return {
        success: false,
        error: new AlreadyExistsSession(),
      };
    }

    return {
      success: true,
      value: await this.sessionPort.save(
        new Session({
          channel,
          players: [playerId],
        })
      ),
    };
  }
}
