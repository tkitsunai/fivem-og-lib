import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session, SessionId } from "../domain/session";

export interface SessionPort {
  save(session: Session): Promise<Session>;
  find(sessionId: SessionId): Promise<Session | null>;
  findByChannelId(channelId: ChannelId): Promise<Session | null>;
  findByPlayerId(playerId: PlayerId): Promise<Session | null>;
  delete(sessionId: SessionId): Promise<void>;
}
