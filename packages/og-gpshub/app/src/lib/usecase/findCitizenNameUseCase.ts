import { Citizen } from "../domain/citizen";
import { CitizenPort } from "../port/citizenPort";

export class FindCitizenUseCase {
  constructor(private readonly citizenPort: CitizenPort) {}

  findCitizen(): Citizen {
    return this.citizenPort.findCitizen();
  }
}
