export const Events = {
  create: "playerCreatedSession",
  join: "playerJoinToSession",
  leave: "playerLeaveSession",
  status: "status",
  recordLocation: "recordLocation",
  receivePlayerLocation: "receivePlayerLocation",
} as const;

export type ServerEvents = typeof Events;
