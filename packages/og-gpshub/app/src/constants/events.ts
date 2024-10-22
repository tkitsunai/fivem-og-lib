export const Events = {
  create: "playerCreatedSession",
  join: "playerJoinToSession",
  leave: "playerLeaveSession",
  status: "status",
  recordLocation: "recordLocation",
  broadcastToChannel: "broadcastToChannel",
  receivePlayerLocation: "receivePlayerLocation",
} as const;

export type ServerEvents = typeof Events;
