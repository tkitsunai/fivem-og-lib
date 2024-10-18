import ServerQBCore from "server-qbcore";
import { PlayerDatas } from "server-qbcore";

export class ServerQBDriver {
  constructor(private readonly qbCore: ServerQBCore) {}

  getPlayerData(): PlayerDatas {
    const citizenData = this.qbCore.Functions.GetPlayer(source);
    return citizenData;
  }
}

export class ClientQBDriver {}
