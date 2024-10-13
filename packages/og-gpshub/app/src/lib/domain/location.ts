import { PlayerId } from "./player";

export type Location = {
  x: number;
  y: number;
  z: number;
};

export type PlayerLocation = {
  values: Map<PlayerId, Location>;
};

export function createNewSessionLocation(): PlayerLocation {
  return {
    values: new Map<PlayerId, Location>(),
  };
}
