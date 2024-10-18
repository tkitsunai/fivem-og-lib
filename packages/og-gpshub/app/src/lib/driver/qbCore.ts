import ClientQBCore from "client-qbcore";
import ServerQBCore from "server-qbcore";

const exp = global.exports;
export const clientQBCore: ClientQBCore = exp["qb-core"].GetCoreObject();
export const serversQBCore: ServerQBCore = exp["qb-core"].GetCoreObject();
