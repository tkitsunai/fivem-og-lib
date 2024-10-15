import { Channel } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";

export class LeaveSessionUseCase {
  constructor(private sessionPort: SessionPort) {}

  async execute(channel: Channel, playerId: PlayerId): Promise<Session | null> {
    const session = await this.sessionPort.findByChannelId(channel.id);

    if (session) {
      const updatedSession = session.leave(playerId);
      return await this.sessionPort.save(updatedSession);
    }
    return null;
  }
}
