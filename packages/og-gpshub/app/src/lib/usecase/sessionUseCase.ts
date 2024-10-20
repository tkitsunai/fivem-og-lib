import { SessionPort } from "../port/sessionPort";

export class SessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}
}
