import QBCore, { PlayerDatas } from "qbcore";

export class QBCitizenDriver {
  private readonly qbCore: QBCore = exports["qb-core"].GetCoreObject();

  constructor() {}

  getPlayerData(): PlayerDatas {
    return this.qbCore.Functions.GetPlayerData();
  }
}
