import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session, SessionId } from "../domain/session";

export interface SessionPort {
  save(session: Session): Promise<Session>;
  findByChannelId(channelId: ChannelId): Promise<Session | null>;
  findAll(): Promise<Session[]>;
}
