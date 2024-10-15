// WIP
declare module "qbcore" {
  interface QBCore {
    Functions: {
      GetPlayerData(): PlayerDatas;
      Notify(
        message: string,
        type?: "success" | "info" | "error" | "police",
        duration?: number
      ): void;
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
