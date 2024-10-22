import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { FindSessionUseCase } from "@/src/lib/usecase/findSessionUseCase";
import { Events } from "@/src/constants/events";
import { PlayerId } from "@/src/lib/domain/player";

export class RecordLocation {
  constructor(
    private readonly serverEvent: ServerEventUseCase,
    private readonly findSessionUseCase: FindSessionUseCase
  ) {
    this.onRecordLocation();
  }

  onRecordLocation() {
    this.serverEvent.on(Events.recordLocation, async () => {
      const result = await this.findSessionUseCase.findByPlayerId(source as PlayerId);

      if (!result.success) {
        console.error("failed to find session.", result.error);
        return;
      }

      this.serverEvent.emit(Events.broadcastToChannel, result.value.getChannel());
    });
  }
}
