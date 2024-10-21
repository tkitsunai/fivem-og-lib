import { BlipNumber } from "../domain/blip";
import { PlayerLocation } from "../domain/location";
import { PlayerId, PlayerInfo } from "../domain/player";
import { BlipPort } from "../port/blipPort";

export class BlipGateway implements BlipPort {
  private readonly blipMap: Map<PlayerId, BlipNumber> = new Map();

  constructor() {}

  async findBlipByPlayerId(playerId: PlayerId): Promise<BlipNumber> {
    const foundBlip = this.blipMap.get(playerId);
    if (!foundBlip) {
      console.log("create new blip");
      const pId = GetPlayerFromServerId(playerId);
      const ped = GetPlayerPed(pId);
      if (ped) {
        console.log("found ped", ped);
      } else {
        console.log("not found ped");
      }
      // TODO: move to drawBlip
      const newBlip = AddBlipForEntity(ped);
      SetBlipSprite(newBlip, 480);
      SetBlipColour(newBlip, 2);
      SetBlipScale(newBlip, 1);
      BeginTextCommandSetBlipName("STRING");
      AddTextComponentString("test");
      EndTextCommandSetBlipName(newBlip);
      this.blipMap.set(playerId, newBlip);
      return newBlip;
    }
    console.log("found blip");
    return foundBlip;
  }

  async drawBlip(
    blip: BlipNumber,
    PlayerLocation: PlayerLocation,
    player: PlayerInfo
  ): Promise<void> {
    console.log("drawBlipGateway:", blip, PlayerLocation, player);
    throw new Error("Method not implemented.");
  }
}
