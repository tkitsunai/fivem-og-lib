// WIP
declare module "qbcore" {
  interface QBCore {
    Functions: {
      GetPlayerData(): PlayerDatas;
    };
  }

  export interface PlayerDatas {
    citizenid: string;
    charinfo: {
      firstname: string;
      lastname: string;
    };
  }

  const QBCore: QBCore;
  export = QBCore;
}
