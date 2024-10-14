import { describe, expect, it } from "vitest";
import { createLocation, createSession } from "../helpers/helper";
import { PlayerId } from "../../src/lib/domain/player";
import { Channel, ChannelId } from "../../src/lib/domain/channel";
import { Session, SessionId } from "../../src/lib/domain/session";

describe("sessionTest", () => {
  it("should join a session", () => {
    const playerA = "A" as PlayerId;
    const playerB = "B" as PlayerId;
    const channel = { id: "channelId" as ChannelId };

    const init = {
      channel,
      players: [playerA],
    };
    const target = new Session(init);

    const expectedValue = new Session({ channel, players: [playerA, playerB] });

    expect(target.join(playerB)).toEqual(expectedValue);
  });
});
