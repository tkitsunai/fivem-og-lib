import { ServerNetworkPort } from "../port/networkPort";

export class FiveMServerNetworkDriver implements ServerNetworkPort {
  on(eventName: string, handler: (...args: any[]) => void): void {
    onNet(eventName, handler);
  }

  emit(eventName: string, targetId: number, ...args: any[]): void {
    emitNet(eventName, targetId, ...args);
  }
}
