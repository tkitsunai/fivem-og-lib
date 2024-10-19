import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";

export interface SessionPort {
  // commands
  save(session: Session): Promise<Session>;
  deleteByChannelId(channelId: ChannelId): Promise<void>;
  // query
  findByChannelId(channelId: ChannelId): Promise<Session | null>;
  findByPlayerId(playerId: PlayerId): Promise<Session | null>;
  findAll(): Promise<Session[]>;
}
