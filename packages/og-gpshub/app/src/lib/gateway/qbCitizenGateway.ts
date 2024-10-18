import { Citizen, CitizenId, CitizenName } from "../domain/citizen";
import { PlayerId } from "../domain/player";
import { ServerQBDriver } from "../driver/qbDriver";
import { CitizenPort } from "../port/citizenPort";

export class QbCitizenGateway implements CitizenPort {
  constructor(private readonly qbCitizenDriver: ServerQBDriver) {}

  findCitizen(): Citizen {
    const { PlayerData } = this.qbCitizenDriver.getPlayerData();
    return {
      id: PlayerData.citizenid as CitizenId,
      name: {
        firstName: PlayerData.charinfo.firstname,
        lastName: PlayerData.charinfo.lastname,
      } as CitizenName,
    } as Citizen;
  }
}
