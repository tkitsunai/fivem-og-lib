export const Events = {
  create: "playerCreatedSession",
  join: "playerJoinToSession",
  leave: "playerLeaveSession",
  status: "status",
  recordLocation: "recordLocation",
  broadcast: "broadcast",
} as const;

export type ServerEvents = typeof Events;
