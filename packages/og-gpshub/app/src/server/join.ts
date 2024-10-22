import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { JoinSessionUseCase } from "../lib/usecase/joinSessionUseCase";
import { Events } from "../constants/events";
import { ChannelId } from "../lib/domain/channel";
import { PlayerId } from "../lib/domain/player";

export class Join {
  constructor(
    private readonly serverEvent: ServerEventUseCase,
    private readonly joinSessionUseCase: JoinSessionUseCase
  ) {
    this.onJoin();
  }

  onJoin() {
    this.serverEvent.on(Events.join, async (channelId: ChannelId) => {
      const result = await this.joinSessionUseCase.execute({ id: channelId }, source as PlayerId);

      if (!result.success) {
        console.error(result.error);
      }
      console.info("join to chennel session");
    });
  }
}
