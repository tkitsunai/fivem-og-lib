import { ClientNetworkPort, LocalEmitter, ServerNetworkPort } from "../port/networkPort";

export class ClientEventUseCase {
  constructor(
    private readonly eventPrefix: string,
    private readonly networkPort: ClientNetworkPort & LocalEmitter
  ) {}

  on(event: string, handler: (...args: any[]) => void): void {
    const eventName = this.fullEventName(event);
    this.networkPort.on(eventName, handler);
  }

  emitToServer(event: string, ...args: any[]): void {
    const eventName = this.fullEventName(event);
    this.networkPort.emit(eventName, ...args);
  }

  emit(event: string, ...args: any[]): void {
    const eventName = this.fullEventName(event);
    this.networkPort.emitLocal(eventName, ...args);
  }

  private fullEventName(event: string): string {
    return [this.eventPrefix, event].join(":");
  }
}

export class ServerEventUseCase {
  constructor(
    private readonly eventPrefix: string,
    private readonly networkPort: ServerNetworkPort & LocalEmitter
  ) {}

  on(event: string, handler: (...args: any[]) => void): void {
    const eventName = this.fullEventName(event);
    this.networkPort.on(eventName, handler);
  }

  emitToClient(event: string, targetId: number, ...args: any[]): void {
    const eventName = this.fullEventName(event);
    this.networkPort.emit(eventName, targetId, ...args);
  }

  emit(event: string, ...args: any[]): void {
    const eventName = this.fullEventName(event);
    this.networkPort.emitLocal(eventName, ...args);
  }

  private fullEventName(event: string): string {
    return [this.eventPrefix, event].join(":");
  }
}
