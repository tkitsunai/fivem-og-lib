import { CitizenId } from "../domain/citizen";
import { PlayerLocation } from "../domain/location";
import { InMemoryPlayerLocationDriver } from "../driver/inMemoryPlayerLocation";
import { LocationPort } from "../port/locationPort";
import { PlayerId } from "../domain/player";

export class InMemoryPlayerLocationGateway implements LocationPort {
  constructor(private readonly playerLocationDriver: InMemoryPlayerLocationDriver) {}

  async findAll(): Promise<PlayerLocation[]> {
    return await this.playerLocationDriver.findAll();
  }

  async savePlayerLocation2(playerId: PlayerId, location: PlayerLocation): Promise<void> {
    this.playerLocationDriver.savePlayerLocation(playerId.toString(), location);
  }

  async savePlayerLocation(citizenId: CitizenId, location: PlayerLocation): Promise<void> {
    this.playerLocationDriver.savePlayerLocation(citizenId.toString(), location);
  }

  async getPlayerLocation(citizenId: CitizenId): Promise<PlayerLocation | null> {
    return this.playerLocationDriver.getPlayerLocation(citizenId.toString());
  }
}
