import { describe, expect, it } from "vitest";
import { PlayerId } from "../../src/lib/domain/player";
import { ChannelId } from "../../src/lib/domain/channel";
import { Session } from "../../src/lib/domain/session";
import { AlreadyJoinedPlayerError } from "@/src/lib/usecase/errors";

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

  it.each([
    {
      playerSize: "case of 0 player",
      target: new Session({
        channel,
        players: [],
      }),
      expected: false,
    },
    {
      playerSize: "case of 1=> player",
      target: new Session({
        channel,
        players: [playerA],
      }),
      expected: true,
    },
  ])(`session has $playerSize`, ({ target, expected }) => {
    expect(target.hasPlayer()).toBe(expected);
  });

  it.each([
    {
      description: "already joined player",
      target: new Session({ channel, players: [playerA] }),
      addPlayer: playerA,
      expected: new AlreadyJoinedPlayerError(),
    },
  ])(`$description`, ({ target, addPlayer, expected }) => {
    expect(() => target.join(addPlayer)).toThrow(expected);
  });
});
