import { Channel } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";

export class CreateSessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  execute(channel: Channel, playerId: PlayerId): Session {
    const session = new Session({
      channel,
      players: [playerId],
    });

    this.sessionPort.save(session);
    return session;
  }
}
