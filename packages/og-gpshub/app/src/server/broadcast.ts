import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { FindSessionUseCase } from "../lib/usecase/findSessionUseCase";
import { Channel } from "../lib/domain/channel";
import { Events } from "../constants/events";
import { FindPlayerLocationUseCase } from "../lib/usecase/findPlayerLocationUseCase";
import { PlayerInfo } from "../lib/domain/player";

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

      const playerLocationsResult = await this.findPlayerLocationUseCase.findByChannelId(
        channel.id
      );

      if (!playerLocationsResult.success) {
        console.error("player locations not found:", channel.id);
        return;
      }

      playerLocationsResult.value.forEach((playerLocation) => {
        const { playerId } = playerLocation;
        console.log("emit to player:", playerId, "DATA:", playerLocationsResult.value);
        this.eventUseCase.emitToClient(
          Events.updateLocations,
          playerId,
          // TODO get player info from player id
          playerLocationsResult.value.map((playerLocation) => ({
            player: { name: "Yamada-Taro" } as PlayerInfo,
            location: playerLocation.location,
          }))
        );
      });
    });
  }
}
