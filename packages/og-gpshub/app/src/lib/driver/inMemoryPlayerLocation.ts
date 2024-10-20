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

  async getPlayerLocations(playerId: string[]): Promise<Map<string, PlayerLocation>> {
    return playerId
      .map((id) => {
        const location = this.locations.get(id);
        if (location) {
          return { id, location } as const;
        }
      })
      .filter((item) => item !== undefined)
      .reduce<Map<string, PlayerLocation>>((map, { id, location }) => {
        if (location) {
          map.set(id, location);
        }
        return map;
      }, new Map<string, PlayerLocation>());
  }
}
