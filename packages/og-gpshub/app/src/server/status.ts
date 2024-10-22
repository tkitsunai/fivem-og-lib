import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { FindSessionUseCase } from "@/src/lib/usecase/findSessionUseCase";
import { Events } from "../constants/events";

export class Status {
  constructor(
    private readonly eventUseCase: ServerEventUseCase,
    private readonly findSessionUseCase: FindSessionUseCase
  ) {
    this.onStatus();
  }

  onStatus() {
    this.eventUseCase.on(Events.status, async () => {
      const sessions = await this.findSessionUseCase.findAll();
      this.logging(sessions, "SESSION");
    });
  }

  private logging<T>(results: T[], tag: string) {
    if (results.length === 0) {
      console.info("not found: ", tag);
    }

    results.forEach((session) => {
      console.info(`${tag} : `, session);
    });
  }
}
