import { ClientEventUseCase } from "og-core/src/usecase/EventUseCase";
import { Events } from "../constants/events";
import { Player } from "../lib/domain/player";
import { BlipUseCase } from "../lib/usecase/blipUseCase";

export class Locate {
  constructor(
    private readonly clientEvent: ClientEventUseCase,
    private readonly blipUseCase: BlipUseCase
  ) {
    this.onReceivePlayerLocation();
  }

  onReceivePlayerLocation() {
    this.clientEvent.on(Events.receivePlayerLocation, ({ players }: { players: Player[] }) => {
      this.blipUseCase.createBlipForPlayer(players);
    });
  }
}
