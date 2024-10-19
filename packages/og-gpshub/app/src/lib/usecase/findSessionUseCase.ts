import { ChannelId } from "../domain/channel";
import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";
import { SessionNotFoundError } from "./errors";
import { Result } from "./result";

export class FindSessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async findAll(): Promise<Session[]> {
    const results = await this.sessionPort.findAll();
    return results;
  }

  async findByChannelId(channelId: ChannelId): Promise<Result<Session, SessionNotFoundError>> {
    const session = await this.sessionPort.findByChannelId(channelId);

    if (!session) {
      return {
        success: false,
        error: new SessionNotFoundError(),
      };
    }

    return {
      success: true,
      value: session,
    };
  }
}
