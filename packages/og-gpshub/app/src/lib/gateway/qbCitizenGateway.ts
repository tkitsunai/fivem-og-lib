import { CitizenName } from "../domain/citizen";
import { QBCitizenDriver } from "../driver/qbCitizenDriver";
import { CitizenPort } from "../port/citizenPort";

export class QbCitizenGateway implements CitizenPort {
  constructor(private readonly qbCitizenDriver: QBCitizenDriver) {}

  findCitizen(): CitizenName {
    const playerData = this.qbCitizenDriver.getPlayerData();
    return {
      firstName: playerData.charinfo.firstname,
      lastName: playerData.charinfo.lastname,
    } as CitizenName;
  }
}
