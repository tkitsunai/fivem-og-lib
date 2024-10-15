import { describe, expect, it } from "vitest";
import { PlayerId } from "../../src/lib/domain/player";
import { ChannelId } from "../../src/lib/domain/channel";
import { Session } from "../../src/lib/domain/session";

describe("Session Domain Test", () => {
  const playerA = 1 as PlayerId;
  const playerB = 2 as PlayerId;
  const channel = { id: "channelId" as ChannelId };

  it("should join a session", () => {
    const init = {
      channel,
      players: [playerA],
    };
    const target = new Session(init);

    const expectedValue = new Session({ channel, players: [playerA, playerB] });

    expect(target.join(playerB)).toEqual(expectedValue);
  });

  it("should leave a session", () => {
    const target = new Session({
      channel,
      players: [playerA, playerB],
    });
    expect(target.leave(playerB)).toEqual(new Session({ channel, players: [playerA] }));
  });
});
