import { Channel, ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session } from "../domain/session";
import { InMemorySessionDriver, SessionEntity } from "../driver/inMemorySessionDriver";
import { SessionPort } from "../port/sessionPort";

export class InMemorySessionGateway implements SessionPort {
  constructor(private inMemorySessionDriver: InMemorySessionDriver) {}

  async findByPlayerId(playerId: PlayerId): Promise<Session | null> {
    const sessions = await this.inMemorySessionDriver.findAll();
    const joinedSession = sessions.find((session) =>
      session.players.find((p) => p === playerId.toString())
    );
    return joinedSession
      ? new Session({
          channel: { id: joinedSession.channelId as ChannelId } as Channel,
          players: [...joinedSession.players.map((playerId) => playerId as PlayerId)],
        })
      : null;
  }

  async deleteByChannelId(channelId: ChannelId): Promise<void> {
    return this.inMemorySessionDriver.deleteByChannelId(channelId.toString());
  }

  async save(session: Session): Promise<Session> {
    const entity = {
      channelId: session.sessionInfo.channel.id.toString(),
      players: session.sessionInfo.players.map((playerId) => playerId.toString()),
    } as SessionEntity;

    try {
      this.inMemorySessionDriver.save(entity);
    } catch (error) {
      throw new Error(`Failed to save session: ${error}`);
    }

    return session;
  }

  async findByChannelId(channelId: ChannelId): Promise<Session | null> {
    const entity = await this.inMemorySessionDriver.findByChannelId(channelId.toString());

    return entity
      ? new Session({
          channel: { id: entity.channelId as ChannelId },
          players: [...entity.players].map((playerId) => playerId.toString() as PlayerId),
        })
      : null;
  }

  async findAll(): Promise<Session[]> {
    const entities = await this.inMemorySessionDriver.findAll();
    return entities.map((entity) => {
      return new Session({
        channel: { id: entity.channelId as ChannelId },
        players: [...entity.players].map((playerId) => playerId.toString() as PlayerId),
      });
    });
  }
}
