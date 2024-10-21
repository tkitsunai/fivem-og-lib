import { ClientNetworkPort, EventName, LocalEmitter } from "../port/networkPort";

export class FiveMClientNetworkDriver implements ClientNetworkPort, LocalEmitter {
  on(event: string, handler: (...args: any[]) => void): void {
    onNet(event, handler);
  }

  emit(event: string, ...args: any[]): void {
    emitNet(event, ...args);
  }

  emitLocal(eventName: EventName, ...args: any[]): void {
    emit(eventName, ...args);
  }
}
