import { PlayerLocation } from "../../src/lib/domain/location";

export const createLocation = () => {
  return {
    x: 10,
    y: 20,
    z: 30,
  } as PlayerLocation;
};
