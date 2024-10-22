import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { CreateSessionUseCase } from "../lib/usecase/createSessionUseCase";
import { Events } from "../constants/events";
import { Channel, ChannelId, isValidChannel } from "../lib/domain/channel";
import { PlayerId } from "../lib/domain/player";

export class Create {
  constructor(
    private readonly serverEvent: ServerEventUseCase,
    private readonly createSessionUseCase: CreateSessionUseCase
  ) {}

  onCreate() {
    this.serverEvent.on(Events.create, async (channelId: ChannelId) => {
      const channel = {
        id: channelId,
      } as Channel;

      if (!isValidChannel(channel)) {
        console.error("Invalid channel name:");
        return;
      }

      const result = await this.createSessionUseCase.execute(channel, source as PlayerId);

      if (!result.success) {
        console.error(result.error);
        return;
      }

      console.log("create session and joined!", result.value);
    });
  }
}
