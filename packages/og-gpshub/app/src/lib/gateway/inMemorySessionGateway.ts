import { ChannelId } from "../domain/channel";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";

export class InMemorySessionGateway implements SessionPort {
  constructor() {}
  async save(session: Session): Promise<Session> {
    console.log("saved", session);
    return session;
  }
  async findByChannelId(channelId: ChannelId): Promise<Session | null> {
    console.log("findByChannelId", channelId);
    return null;
  }
}
