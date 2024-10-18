import { CitizenId } from "../domain/citizen";
import { PlayerLocation } from "../domain/location";

export interface LocationPort {
  savePlayerLocation(citizenId: CitizenId, location: PlayerLocation): Promise<void>;
}
