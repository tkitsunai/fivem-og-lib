import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session, SessionId } from "../domain/session";
import { SessionPort } from "../port/sessionPort";

export class InMemorySessionGateway implements SessionPort {
  constructor() {}
  save(session: Session): Promise<Session> {
    throw new Error("Method not implemented.");
  }
  findByChannelId(channelId: ChannelId): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
}
