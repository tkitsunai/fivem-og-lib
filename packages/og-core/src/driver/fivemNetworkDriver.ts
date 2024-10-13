import { NetworkPort } from "../port/networkPort";

export class FiveMNetworkDriver implements NetworkPort {
  on(event: string, handler: (...args: any[]) => void): void {
    onNet(event, handler);
  }

  emit(event: string, ...args: any[]): void {
    emitNet(event, ...args);
  }
}
