import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session, SessionId } from "../domain/session";
import { SessionPort } from "../port/sessionPort";

export class QBDBSessionGateway implements SessionPort {
  deleteByChannelId(channelId: ChannelId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Session[]> {
    throw new Error("Method not implemented.");
  }
  save(session: Session): Promise<Session> {
    throw new Error("Method not implemented.");
  }
  find(sessionId: SessionId): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
  findByChannelId(channelId: ChannelId): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
  findByPlayerId(playerId: PlayerId): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
  delete(sessionId: SessionId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
