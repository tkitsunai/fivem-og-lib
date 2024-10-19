type PlayerLocation = {
  x: number;
  y: number;
  z: number;
};

export class InMemoryPlayerLocationDriver {
  private readonly locations = new Map<string, PlayerLocation>();

  async savePlayerLocation(citizenId: string, location: PlayerLocation): Promise<void> {
    this.locations.set(citizenId, location);
  }

  async getPlayerLocation(citizenId: string): Promise<PlayerLocation | null> {
    return this.locations.get(citizenId) || null;
  }

  async findAll(): Promise<PlayerLocation[]> {
    return Array.from(this.locations.values());
  }
}
