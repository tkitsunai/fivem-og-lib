export const Events = {
  create: "playerCreatedSession",
  join: "playerJoinToSession",
  leave: "playerLeaveSession",
  status: "sessionStatus",
} as const;

export type ServerEvents = typeof Events;
