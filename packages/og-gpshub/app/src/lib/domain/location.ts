import { PlayerId } from "./player";

export type PlayerLocation = {
  x: number;
  y: number;
  z: number;
};

export type PlayerAndLocations = {
  playerId: PlayerId;
  location: PlayerLocation;
};
