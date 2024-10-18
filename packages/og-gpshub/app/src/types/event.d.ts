import { PlayerLocation } from "../lib/domain/location";
import { PlayerId } from "../lib/domain/player";

export interface PlayerLocationData {
  playerId: PlayerId;
  location: PlayerLocation;
}
