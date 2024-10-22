import { ClientEventUseCase } from "og-core/src/usecase/EventUseCase";
import { Events } from "../constants/events";
import { PlayerId } from "../lib/domain/player";
import { BlipUseCase } from "../lib/usecase/blipUseCase";
import { FindPlayerUseCase } from "../lib/usecase/findPlayerUseCase";

export class Locate {
  constructor(
    private readonly clientEvent: ClientEventUseCase,
    private readonly findPlayerUseCase: FindPlayerUseCase,
    private readonly blipUseCase: BlipUseCase
  ) {
    this.onReceivePlayerLocation();
  }

  onReceivePlayerLocation() {
    this.clientEvent.on(Events.receivePlayerLocation, ({ players }: { players: PlayerId[] }) => {
      const playerInfos = players
        .map((playerId) => {
          const player = this.findPlayerUseCase.findPlayer(playerId);

          if (!player) {
            console.error("player not found");
            return;
          }
          return player;
        })
        .filter((player) => player !== undefined);

      this.blipUseCase.createBlipForPlayer(playerInfos);
    });
  }
}
