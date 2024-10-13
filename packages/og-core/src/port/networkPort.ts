export type EventName = string;
export type Handler = (...args: any[]) => void;

export interface NetworkPort {
  on(event: EventName, handler: Handler): void;
  emit(event: EventName, ...args: any[]): void;
}
