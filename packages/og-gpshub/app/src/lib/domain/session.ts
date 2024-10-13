import { Channel } from "./channel";
import { PlayerLocation, Location } from "./location";
import { PlayerId } from "./player";

export type SessionId = string & { __brand: "SessionId" };

export interface SessionInfo {
  sessionId: SessionId;
  channel: Channel;
  playerLocations: PlayerLocation;
}

export class Session {
  constructor(readonly sessionInfo: SessionInfo) {}

  updatePlayerLocation(playerId: PlayerId, location: Location): Session {
    const playerLocations = new Map(this.sessionInfo.playerLocations.values);
    playerLocations.set(playerId, location);
    return new Session({
      ...this.sessionInfo,
      playerLocations: { values: playerLocations },
    });
  }

  leavePlayer(playerId: PlayerId): Session {
    const playerLocations = new Map(this.sessionInfo.playerLocations.values);
    playerLocations.delete(playerId);
    return new Session({
      ...this.sessionInfo,
      playerLocations: { values: playerLocations },
    });
  }

  joinPlayer(playerId: PlayerId, location: Location): Session {
    return new Session({
      ...this.sessionInfo,
      playerLocations: {
        values: new Map([...this.sessionInfo.playerLocations.values, [playerId, location]]),
      },
    });
  }
}
