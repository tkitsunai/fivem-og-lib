import { Blip, BlipNumber } from "../domain/blip";
import { Player, PlayerServerId } from "../domain/player";
import { BlipPort } from "../port/blipPort";

export class BlipGateway implements BlipPort {
  constructor() {}

  removeBlip(blip: BlipNumber): void {
    RemoveBlip(blip);
  }

  createBlipForPlayer(playerInfo: Player): Blip {
    const pid = GetPlayerFromServerId(playerInfo.id as PlayerServerId);
    const ped = GetPlayerPed(pid);
    const blip = AddBlipForEntity(ped);
    SetBlipSprite(blip, 480);
    SetBlipColour(blip, 2);
    SetBlipScale(blip, 1.1);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString(playerInfo.name.getFullName());
    EndTextCommandSetBlipName(blip);
    return {
      entityId: playerInfo.id,
      blipNumber: blip,
    } as Blip;
  }
}
