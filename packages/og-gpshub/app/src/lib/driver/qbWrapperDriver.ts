import QBCore from "qbcore";

export class QBDriver {
  private readonly qbCore: QBCore = exports["qb-core"].GetCoreObject();

  constructor() {}

  getFn(): QBCore {
    return this.qbCore;
  }
}
