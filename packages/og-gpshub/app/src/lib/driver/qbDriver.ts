import ServerQBCore from "server-qbcore";
import { PlayerDatas } from "server-qbcore";

export class ServerQBDriver {
  constructor(private readonly qbCore: ServerQBCore) {}

  getPlayerData(serverPlayerId: number): PlayerDatas {
    const citizenData = this.qbCore.Functions.GetPlayer(serverPlayerId);
    return citizenData;
  }
}

export class ClientQBDriver {}
