type PlayerId = number;

export type SessionEntity = {
  channelId: string;
  players: PlayerId[];
};

export class InMemorySessionDriver {
  private sessions: Map<string, SessionEntity> = new Map();

  async save(session: SessionEntity): Promise<void> {
    console.log("SAVE SESSION: ", session);
    this.sessions.set(this.savedKey(session.channelId), session);
  }

  async findByChannelId(channelId: string): Promise<SessionEntity | null> {
    return this.sessions.get(this.savedKey(channelId)) || null;
  }

  async findAll(): Promise<SessionEntity[]> {
    return Array.from(this.sessions.values());
  }

  async deleteByChannelId(channelId: string): Promise<void> {
    const actionResult = this.sessions.delete(this.savedKey(channelId));
    console.log("DELETE SESSION: ", channelId, actionResult);
    return;
  }

  private savedKey(key: string): string {
    return key.toLowerCase();
  }
}
