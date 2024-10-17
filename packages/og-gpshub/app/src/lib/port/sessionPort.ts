import { ChannelId } from "../domain/channel";
import { Session } from "../domain/session";

export interface SessionPort {
  save(session: Session): Promise<Session>;
  findByChannelId(channelId: ChannelId): Promise<Session | null>;
  findAll(): Promise<Session[]>;
  deleteByChannelId(channelId: ChannelId): Promise<void>;
}
