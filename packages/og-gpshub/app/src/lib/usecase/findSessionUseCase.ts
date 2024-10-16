import { Session } from "../domain/session";
import { SessionPort } from "../port/sessionPort";

export class FindSessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}

  async findAll(): Promise<Session[]> {
    const results = await this.sessionPort.findAll();
    return results;
  }
}
