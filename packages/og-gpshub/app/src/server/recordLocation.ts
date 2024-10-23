import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { FindSessionUseCase } from "@/src/lib/usecase/findSessionUseCase";
import { Events } from "@/src/constants/events";
import { PlayerId } from "@/src/lib/domain/player";
import { FindPlayerUseCase } from "../lib/usecase/findPlayerUseCase";

export class RecordLocation {
  constructor(
    private readonly serverEvent: ServerEventUseCase,
    private readonly findSessionUseCase: FindSessionUseCase,
    private readonly findPlayerUseCase: FindPlayerUseCase
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

      const playerIds = result.value.findAllPlayers();

      const players = playerIds
        .map((playerId) => {
          return this.findPlayerUseCase.findPlayer(playerId);
        })
        .filter((player) => player !== null);

      this.serverEvent.emitToClient(Events.receivePlayerLocation, -1, { players });
    });
  }
}
