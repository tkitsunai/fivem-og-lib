import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { FindSessionUseCase } from "@/src/lib/usecase/findSessionUseCase";
import { Events } from "../constants/events";
import { FindPlayerLocationUseCase } from "../lib/usecase/findPlayerLocationUseCase";

export class StatusEventHandler {
  constructor(
    private readonly eventUseCase: ServerEventUseCase,
    private readonly findSessionUseCase: FindSessionUseCase,
    private readonly findLocationUseCase: FindPlayerLocationUseCase
  ) {
    this.onStatus();
  }

  onStatus() {
    this.eventUseCase.on(Events.status, async () => {
      const sessions = await this.findSessionUseCase.findAll();
      const locations = await this.findLocationUseCase.findAll();
      this.logging(sessions, "SESSION");
      this.logging(locations, "LOCATION");
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
