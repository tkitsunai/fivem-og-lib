import { CitizenId } from "../domain/citizen";
import { PlayerLocation } from "../domain/location";
import { LocationPort } from "../port/locationPort";
import { SessionPort } from "../port/sessionPort";

export class UpdatePlayerLocationUseCase {
  constructor(
    private readonly locationPort: LocationPort,
    private readonly sessionPort: SessionPort
  ) {}

  async execute(citizenId: CitizenId, location: PlayerLocation) {
    this.locationPort.savePlayerLocation(citizenId, location);
    // TODO セッションと連携し、チャネルと位置情報を関連付けする
  }
}
