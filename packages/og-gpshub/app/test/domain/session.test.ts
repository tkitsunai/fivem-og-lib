import { describe, expect, it } from "vitest";
import { createLocation, createSession } from "../helpers/helper";
import { PlayerId } from "../../src/lib/domain/player";
import { Channel } from "../../src/lib/domain/channel";
import { Session, SessionId } from "../../src/lib/domain/session";

describe("session domain test", () => {
  it("should update player location", () => {
    const target = createSession();

    const playerId = "player" as PlayerId;
    const actual = target.updatePlayerLocation(playerId, createLocation());

    const expectValue = new Session({
      sessionId: "session" as SessionId,
      channel: { id: "channel" } as Channel,
      playerLocations: {
        values: new Map([[playerId, createLocation()]]),
      },
    });

    expect(actual).toEqual(expectValue);
  });
});
