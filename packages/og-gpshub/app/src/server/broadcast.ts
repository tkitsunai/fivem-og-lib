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
    this.eventUseCase.on(Events.broadcast, async (channel: Channel) => {
      const session = await this.findSessionUseCase.findByChannelId(channel.id);

      if (!session) {
        console.error("session not found");
        return;
      }

      console.log("broadcasting to channel members");
      console.log("channel:", channel);
      console.log("found session:", session);
      //TODO: implement broadcast usecase, emit event to all members of the channel
    });
  }
}
