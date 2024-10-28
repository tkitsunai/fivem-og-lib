import { ClientEventUseCase } from "og-core/src/usecase/EventUseCase";
import { Events } from "../constants/events";
import { PlayerId, PlayerName } from "../lib/domain/player";
import { BlipUseCase } from "../lib/usecase/blipUseCase";

type PlayerStructure = {
  id: string;
  name: string;
};

export class Locate {
  constructor(
    private readonly clientEvent: ClientEventUseCase,
    private readonly blipUseCase: BlipUseCase
  ) {
    this.onReceivePlayerLocation();
  }

  onReceivePlayerLocation() {
    this.clientEvent.on(
      Events.receivePlayerLocation,
      ({ players }: { players: PlayerStructure[] }) => {
        const playersDomain = players.map((player) => ({
          id: player.id as PlayerId,
          name: PlayerName.fromSplitName(player.name),
        }));
        this.blipUseCase.createBlipForPlayer(playersDomain);
      }
    );
  }
}
