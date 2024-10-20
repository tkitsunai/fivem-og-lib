import { CitizenId } from "../domain/citizen";
import { PlayerAndLocations, PlayerLocation } from "../domain/location";
import { InMemoryPlayerLocationDriver } from "../driver/inMemoryPlayerLocation";
import { LocationPort } from "../port/locationPort";
import { PlayerId } from "../domain/player";

export class InMemoryPlayerLocationGateway implements LocationPort {
  constructor(private readonly playerLocationDriver: InMemoryPlayerLocationDriver) {}

  async findPlayerLocatoios(playerIds: PlayerId[]): Promise<PlayerAndLocations[]> {
    const playerLocationEntities = await this.playerLocationDriver.getPlayerLocations(
      playerIds.map((id) => id.toString())
    );

    return Array.from(playerLocationEntities.entries()).map(([playerId, location]) => ({
      playerId: parseInt(playerId) as PlayerId,
      location,
    }));
  }

  async findAll(): Promise<PlayerLocation[]> {
    return await this.playerLocationDriver.findAll();
  }

  async savePlayerLocation2(playerId: PlayerId, location: PlayerLocation): Promise<void> {
    this.playerLocationDriver.savePlayerLocation(playerId.toString(), location);
  }

  async savePlayerLocation(citizenId: CitizenId, location: PlayerLocation): Promise<void> {
    this.playerLocationDriver.savePlayerLocation(citizenId.toString(), location);
  }
}
