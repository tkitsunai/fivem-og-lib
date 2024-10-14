import { Channel } from "./channel";
import { PlayerLocation, Location } from "./location";
import { PlayerId } from "./player";

export type SessionId = string & { __brand: "SessionId" };

export interface SessionInfo {
  channel: Channel;
  players: PlayerId[];
}
export class Session {
  constructor(readonly sessionInfo: SessionInfo) {}

  join(playerId: PlayerId): Session {
    return new Session({
      ...this.sessionInfo,
      players: [...this.sessionInfo.players, playerId],
    });
  }
}
