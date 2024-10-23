import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { Events } from "../constants/events";
import { LeaveSessionUseCase } from "../lib/usecase/leaveSessionUseCase";
import { Channel, ChannelId, isValidChannel } from "../lib/domain/channel";
import { PlayerId } from "../lib/domain/player";
import { FindPlayerUseCase } from "../lib/usecase/findPlayerUseCase";

export class Leave {
  constructor(
    private readonly serverEvent: ServerEventUseCase,
    private readonly leaveSessionUseCase: LeaveSessionUseCase,
    private readonly findPlayerUseCase: FindPlayerUseCase
  ) {
    this.onLeave();
  }

  onLeave() {
    this.serverEvent.on(Events.leave, async (channelId: ChannelId) => {
      const channel = {
        id: channelId,
      } as Channel;

      if (!isValidChannel(channel)) {
        console.error("invalid channel id:", channelId);
        return;
      }

      const player = this.findPlayerUseCase.findPlayer(source as PlayerId);
      if (!player) {
        console.error("player not found:", source);
        return;
      }

      const result = await this.leaveSessionUseCase.execute(channel, player.id);

      if (!result.success) {
        console.error(result.error);
      }

      console.log("leave session:", result.success);
    });
  }
}
