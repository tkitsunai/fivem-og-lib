// WIP
declare module "client-qbcore" {
  interface ClientQBCore {
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
    citizenid: number;
    charinfo: {
      firstname: string;
      lastname: string;
    };
  }

  const ClientQBCore: ClientQBCore;
  export = ClientQBCore;
}

declare module "server-qbcore" {
  interface ServerQBCore {
    Functions: {
      GetPlayer(source: number): PlayerDatas;
      GetPlayerByCitizenId(citizenId: string): PlayerDatas;
    };
  }

  export interface PlayerDatas {
    Offline: boolean;
    PlayerData: {
      citizenid: string;
      charinfo: {
        firstname: string;
        lastname: string;
      };
    };
  }

  const ServerQBCore: ServerQBCore;
  export = ServerQBCore;
}
