import { AlreadyJoinedPlayerError } from "../usecase/errors";
import { Channel } from "./channel";
import { PlayerId } from "./player";

export type SessionId = string & { __brand: "SessionId" };

export interface SessionInfo {
  channel: Channel;
  players: PlayerId[];
}
export class Session {
  constructor(readonly sessionInfo: SessionInfo) {}

  join(playerId: PlayerId): Session {
    if (this.sessionInfo.players.includes(playerId)) {
      throw new AlreadyJoinedPlayerError();
    }

    return new Session({
      ...this.sessionInfo,
      players: [...this.sessionInfo.players, playerId],
    });
  }

  leave(leavePlayer: PlayerId): Session {
    const result = this.sessionInfo.players.filter((player) => player !== leavePlayer);
    return new Session({
      ...this.sessionInfo,
      players: result,
    });
  }

  hasPlayer(): boolean {
    return this.sessionInfo.players.length > 0;
  }

  findAllPlayers(): PlayerId[] {
    return this.sessionInfo.players;
  }

  getChannel(): Channel {
    return this.sessionInfo.channel;
  }
}
