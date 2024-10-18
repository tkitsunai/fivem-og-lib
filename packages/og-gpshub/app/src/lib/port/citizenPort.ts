import { Citizen } from "../domain/citizen";
import { PlayerId } from "../domain/player";

export interface CitizenPort {
  findCitizen(): Citizen;
}
