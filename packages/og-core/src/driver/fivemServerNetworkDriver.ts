import { LocalEmitter, ServerNetworkPort } from "../port/networkPort";

export class FiveMServerNetworkDriver implements ServerNetworkPort, LocalEmitter {
  on(eventName: string, handler: (...args: any[]) => void): void {
    onNet(eventName, handler);
  }

  emit(eventName: string, targetId: number, ...args: any[]): void {
    emitNet(eventName, targetId, ...args);
  }

  emitLocal(eventName: string, ...args: any[]): void {
    emit(eventName, ...args);
  }
}
