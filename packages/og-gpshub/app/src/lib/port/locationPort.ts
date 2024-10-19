import { CitizenId } from "../domain/citizen";
import { PlayerLocation } from "../domain/location";
import { PlayerId } from "../domain/player";

export interface LocationPort {
  savePlayerLocation(citizenId: CitizenId, location: PlayerLocation): Promise<void>;
  savePlayerLocation2(playerId: PlayerId, location: PlayerLocation): Promise<void>;
  findAll(): Promise<PlayerLocation[]>;
}
