import { CitizenName } from "../domain/citizen";

export interface CitizenPort {
  findCitizen(): CitizenName;
}
