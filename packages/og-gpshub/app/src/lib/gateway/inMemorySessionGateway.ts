import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { InMemorySessionDriver, SessionEntity } from "../driver/inMemorySessionDriver";
import { SessionPort } from "../port/sessionPort";

export class InMemorySessionGateway implements SessionPort {
  constructor(private inMemorySessionDriver: InMemorySessionDriver) {}

  async save(session: Session): Promise<Session> {
    const entity = {
      channelId: session.sessionInfo.channel.id.toString(),
      players: session.sessionInfo.players,
    } as SessionEntity;

    try {
      this.inMemorySessionDriver.save(entity);
    } catch (error) {
      throw new Error(`Failed to save session: ${error}`);
    }

    return session;
  }

  async findByChannelId(channelId: ChannelId): Promise<Session | null> {
    const entity = await this.inMemorySessionDriver.findByChannelId(channelId);

    return entity
      ? new Session({
          channel: { id: entity.channelId as ChannelId },
          players: [...entity.players].map((playerId) => playerId as PlayerId),
        })
      : null;
  }

  async findAll(): Promise<Session[]> {
    const entities = await this.inMemorySessionDriver.findAll();
    return entities.map((entity) => {
      return new Session({
        channel: { id: entity.channelId as ChannelId },
        players: [...entity.players].map((playerId) => playerId as PlayerId),
      });
    });
  }
}
