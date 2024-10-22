import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { Events } from "../constants/events";
import { LeaveSessionUseCase } from "../lib/usecase/leaveSessionUseCase";
import { ChannelId } from "../lib/domain/channel";
import { PlayerId } from "../lib/domain/player";

export class Leave {
  constructor(
    private readonly serverEvent: ServerEventUseCase,
    private readonly leaveSessionUseCase: LeaveSessionUseCase
  ) {
    this.onLeave();
  }

  onLeave() {
    this.serverEvent.on(Events.leave, async (channelId: ChannelId) => {
      const result = await this.leaveSessionUseCase.execute({ id: channelId }, source as PlayerId);

      if (!result.success) {
        console.error(result.error);
      }

      console.log("leave session:", result.success);
    });
  }
}
