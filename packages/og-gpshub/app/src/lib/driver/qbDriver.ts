import ClientQBCore from "client-qbcore";
import ServerQBCore from "server-qbcore";
import { PlayerDatas as ServerPlayerDatas } from "server-qbcore";
import { PlayerDatas as ClientPlayerDatas } from "client-qbcore";

export class ServerQBDriver {
  constructor(private readonly qbCore: ServerQBCore) {}

  getPlayerData(serverPlayerId: number): ServerPlayerDatas {
    const citizenData = this.qbCore.Functions.GetPlayer(serverPlayerId);
    return citizenData;
  }

  getPlayerDataByCitizen(citizenId: string): ServerPlayerDatas {
    const citizenData = this.qbCore.Functions.GetPlayerByCitizenId(citizenId);
    return citizenData;
  }
}

export class ClientQBDriver {
  constructor(private readonly qbCore: ClientQBCore) {}

  getPlayerData(): ClientPlayerDatas {
    throw new Error("Method not implemented.");
  }
}
