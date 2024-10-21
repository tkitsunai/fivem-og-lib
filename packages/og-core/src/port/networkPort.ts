export type EventName = string;
export type Handler = (...args: any[]) => void;

export interface LocalEmitter {
  emitLocal(eventName: EventName, ...args: any[]): void;
}

export interface ClientNetworkPort {
  on(event: EventName, handler: Handler): void;
  emit(event: EventName, ...args: any[]): void;
}
export interface ServerNetworkPort {
  on(eventName: string, handler: (...args: any[]) => void): void;
  emit(eventName: string, targetId: number, ...args: any[]): void;
}
