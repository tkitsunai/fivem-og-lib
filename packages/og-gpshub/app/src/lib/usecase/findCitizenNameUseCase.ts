import { CitizenName } from "../domain/citizen";
import { CitizenPort } from "../port/citizenPort";

export class FindCitizenNameUseCase {
  constructor(private readonly citizenPort: CitizenPort) {}

  execute(): CitizenName {
    return this.citizenPort.findCitizen();
  }
}
