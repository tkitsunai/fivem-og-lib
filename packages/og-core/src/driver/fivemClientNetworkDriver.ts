import { ClientNetworkPort } from "../port/networkPort";

export class FiveMClientNetworkDriver implements ClientNetworkPort {
  on(event: string, handler: (...args: any[]) => void): void {
    onNet(event, handler);
  }

  emit(event: string, ...args: any[]): void {
    emitNet(event, ...args);
  }
}
