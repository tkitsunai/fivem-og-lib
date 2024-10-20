import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { FindSessionUseCase } from "../lib/usecase/findSessionUseCase";
import { Channel } from "../lib/domain/channel";
import { Events } from "../constants/events";
import { FindPlayerLocationUseCase } from "../lib/usecase/findPlayerLocationUseCase";

export class Broadcast {
  constructor(
    private readonly eventUseCase: ServerEventUseCase,
    private readonly findSessionUseCase: FindSessionUseCase,
    private readonly findPlayerLocationUseCase: FindPlayerLocationUseCase
  ) {
    this.onBroadcast();
  }

  onBroadcast() {
    this.eventUseCase.on(Events.broadcast, async (channel: Channel) => {
      const foundSessionResult = await this.findSessionUseCase.findByChannelId(channel.id);

      if (!foundSessionResult.success) {
        console.error("session not found:", channel.id);
        return;
      }

      console.log("broadcasting to channel members");
      console.log("channel:", channel);
      console.log("found session:", foundSessionResult);

      //TODO: implement broadcast usecase, emit event to all members of the channel
      const playerLocationsResult = await this.findPlayerLocationUseCase.findByChannelId(
        channel.id
      );

      if (!playerLocationsResult.success) {
        console.error("player locations not found:", channel.id);
        return;
      }

      console.log("player locations:", playerLocationsResult.value);
    });
  }
}
