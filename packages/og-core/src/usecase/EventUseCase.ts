import { ClientNetworkPort, ServerNetworkPort } from "../port/networkPort";

export class ClientEventUseCase {
  constructor(
    private readonly eventPrefix: string,
    private readonly networkPort: ClientNetworkPort
  ) {}

  on(event: string, handler: (...args: any[]) => void): void {
    const eventName = this.fullEventName(event);
    this.networkPort.on(eventName, handler);
  }

  emitToServer(event: string, ...args: any[]): void {
    const eventName = this.fullEventName(event);
    this.networkPort.emit(eventName, ...args);
  }

  private fullEventName(event: string): string {
    return [this.eventPrefix, event].join(":");
  }
}

export class ServerEventUseCase {
  constructor(
    private readonly eventPrefix: string,
    private readonly networkPort: ServerNetworkPort
  ) {}

  on(event: string, handler: (...args: any[]) => void): void {
    const eventName = this.fullEventName(event);
    this.networkPort.on(eventName, handler);
  }

  emitToClient(event: string, targetId: number, ...args: any[]): void {
    const eventName = this.fullEventName(event);
    this.networkPort.emit(eventName, targetId, ...args);
  }

  private fullEventName(event: string): string {
    return [this.eventPrefix, event].join(":");
  }
}
