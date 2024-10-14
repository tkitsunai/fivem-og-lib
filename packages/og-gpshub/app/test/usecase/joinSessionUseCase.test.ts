import { Channel, ChannelId } from "src/lib/domain/channel";
import { PlayerId } from "src/lib/domain/player";
import { Session } from "../../src/lib/domain/session";
import { SessionPort } from "src/lib/port/sessionPort";
import { JoinSessionUseCase } from "../../src/lib/usecase/joinSessionUseCase";
import { describe, expect, it, vi } from "vitest";

describe("joinSessionUseCaseTest", () => {
  it("should join a session by player", async () => {
    const saveMock = vi.fn();
    const channelId = "channelId" as ChannelId;
    const channel = { id: channelId } as Channel;
    const playerId1 = "playerId1" as PlayerId;
    const playerId2 = "playerId2" as PlayerId;

    const sessionMock = new Session({
      channel,
      players: [playerId1],
    });

    const findByChannelIdMock = vi.fn().mockReturnValue(sessionMock);

    const portMock: Partial<SessionPort> = {
      save: saveMock,
      findByChannelId: findByChannelIdMock,
    };
    const target = new JoinSessionUseCase(portMock as SessionPort);

    const actual = await target.execute(channel, playerId2);

    expect(findByChannelIdMock).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalled();

    const expectedValue = new Session({
      channel: channel,
      players: [playerId1, playerId2],
    });

    expect(actual?.sessionInfo).toEqual(expectedValue.sessionInfo);
  });
});
