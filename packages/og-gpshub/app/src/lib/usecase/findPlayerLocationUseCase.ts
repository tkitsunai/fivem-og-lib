import { PlayerLocation } from "../domain/location";
import { LocationPort } from "../port/locationPort";

export class FindPlayerLocationUseCase {
  constructor(private readonly locationPort: LocationPort) {}

  async findAll(): Promise<PlayerLocation[]> {
    return await this.locationPort.findAll();
  }
}
