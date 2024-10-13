import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session, SessionId } from "../domain/session";
import { createNewSessionLocation, Location, PlayerLocation } from "../domain/location";
import { SessionPort } from "../port/sessionPort";
import { NetworkPort } from "og-core/src/port/networkPort";

export class SessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async join(channelId: ChannelId, playerId: string, location: Location) {
    const hoge = playerId as PlayerId;
    const session = await this.sessionPort.findByPlayerId(hoge);
    if (!session) {
      const createdSession = new Session({
        sessionId: "new-sessionId" as SessionId,
        channel: { id: channelId },
        playerLocations: createNewSessionLocation(),
      });
      console.log("createdSession", createdSession);
      this.sessionPort.save(createdSession);
    } else {
      const createdSession = session.updatePlayerLocation(hoge, location);
      this.sessionPort.save(createdSession);
    }
  }

  async findAllPlayerLocations(channelId: ChannelId): Promise<PlayerLocation | null> {
    const session = await this.sessionPort.findByChannelId(channelId);

    if (!session) {
      return null;
    }

    return session.sessionInfo.playerLocations;
  }

  async leaveSession(playerId: PlayerId) {
    const session = await this.sessionPort.findByPlayerId(playerId);

    if (!session) {
      return;
    }

    const updatedSession = session.leavePlayer(playerId);
    this.sessionPort.save(updatedSession);
  }
}
