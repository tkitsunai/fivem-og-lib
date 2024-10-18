export const Events = {
  create: "playerCreatedSession",
  join: "playerJoinToSession",
  leave: "playerLeaveSession",
  status: "sessionStatus",
  recordLocation: "recordLocation",
} as const;

export type ServerEvents = typeof Events;
