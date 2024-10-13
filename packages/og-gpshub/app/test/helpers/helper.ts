import { Location } from "../../src/lib/domain/location";
import { Session, SessionId, SessionInfo } from "../../src/lib/domain/session";
import { Channel, ChannelId } from "../../src/lib/domain/channel";
import { PlayerId } from "../../src/lib/domain/player";

export const createSession = () => {
  return new Session({
    sessionId: "session" as SessionId,
    channel: {
      id: "channel" as ChannelId,
    } as Channel,
    playerLocations: {
      values: new Map<PlayerId, Location>(),
    },
  } as SessionInfo);
};

export const createLocation = () => {
  return {
    x: 10,
    y: 20,
    z: 30,
  } as Location;
};
