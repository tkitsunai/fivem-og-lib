import { NetworkPort } from "og-core/src/port/networkPort";

export class EventUseCase {
  constructor(private readonly networkPort: NetworkPort) {}

  on(event: string, handler: (...args: any[]) => void): void {
    console.log("EventUseCase.on:", event);
    this.networkPort.on(event, handler);
  }

  emit(event: string, ...args: any[]): void {
    this.networkPort.emit(event, ...args);
  }
}
