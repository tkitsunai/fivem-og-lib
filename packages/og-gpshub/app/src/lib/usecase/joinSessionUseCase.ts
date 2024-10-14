import { Channel } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";

export class JoinSessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async execute(channel: Channel, playerId: PlayerId): Promise<Session | null> {
    const session = await this.sessionPort.findByChannelId(channel.id);
    if (session) {
      const joinedSession = session.join(playerId);
      this.sessionPort.save(joinedSession);
      return joinedSession;
    }
    return null;
  }
}
