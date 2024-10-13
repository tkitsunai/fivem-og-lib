type SessionId = string & { __brand: "SessionId" };
type ChannelId = string & { __brand: "ChannelId" };

type SessionEntity = {
  id: SessionId;
  channelId: ChannelId;
  expiresAt: Date;
};

export class InMemorySessionDriver {
  private sessions: Map<SessionId, SessionEntity> = new Map();

  async save(sessionId: SessionId, session: SessionEntity): Promise<SessionEntity> {
    this.sessions.set(sessionId, session);
    return session;
  }

  async find(sessionId: SessionId): Promise<SessionEntity | null> {
    return this.sessions.get(sessionId) ?? null;
  }

  async delete(sessionId: SessionId): Promise<void> {
    this.sessions.delete(sessionId);
  }
}
