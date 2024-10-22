import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { FindSessionUseCase } from "../lib/usecase/findSessionUseCase";
import { Channel } from "../lib/domain/channel";
import { Events } from "../constants/events";

export class Broadcast {
  constructor(
    private readonly eventUseCase: ServerEventUseCase,
    private readonly findSessionUseCase: FindSessionUseCase
  ) {
    this.onBroadcast();
  }

  onBroadcast() {
    this.eventUseCase.on(Events.broadcastToChannel, async (channel: Channel) => {
      const foundSessionResult = await this.findSessionUseCase.findByChannelId(channel.id);

      if (!foundSessionResult.success) {
        console.error("session not found:", channel.id);
        return;
      }

      const players = foundSessionResult.value.findAllPlayers();

      this.eventUseCase.emitToClient(Events.receivePlayerLocation, -1, { players });
    });
  }
}
