import { Channel, ChannelId } from "src/lib/domain/channel";
import { PlayerId } from "src/lib/domain/player";
import { Session } from "../../src/lib/domain/session";
import { SessionPort } from "src/lib/port/sessionPort";
import { JoinSessionUseCase } from "../../src/lib/usecase/joinSessionUseCase";
import { describe, expect, it, vi } from "vitest";
import { ChannelNotFoundError } from "@/src/lib/usecase/errors";

describe("joinSessionUseCaseTest", () => {
  const channelId = "channelId" as ChannelId;
  const channel = { id: channelId } as Channel;
  const playerId1 = 1 as PlayerId;
  const playerId2 = 2 as PlayerId;

  it("should join a session by player", async () => {
    const session = new Session({
      channel,
      players: [playerId1],
    });

    const expectedValue = new Session({
      channel: channel,
      players: [playerId1, playerId2],
    });

    const joinSpy = vi.spyOn(session, "join").mockReturnValue(expectedValue);

    const portMock = {
      save: vi.fn().mockReturnValue(expectedValue),
      findByChannelId: vi.fn().mockReturnValue(session),
    };

    const actual = await new JoinSessionUseCase(portMock as SessionPort).execute(
      channel,
      playerId2
    );

    expect(portMock.findByChannelId).toHaveBeenCalled();
    expect(joinSpy).toHaveBeenCalledWith(playerId2);
    expect(portMock.save).toHaveBeenCalled();
    expect(actual.success).toBeTruthy();
    actual.success && expect(actual.value).toEqual(expectedValue);
  });

  it("if channel not found, should return error", async () => {
    const portMock: Partial<SessionPort> = {
      save: vi.fn(),
      findByChannelId: vi.fn().mockReturnValue(null),
    };

    const actual = await new JoinSessionUseCase(portMock as SessionPort).execute(
      channel,
      playerId2
    );

    expect(actual.success).toBeFalsy();
    !actual.success && expect(actual.error).toBeInstanceOf(ChannelNotFoundError);

    expect(portMock.findByChannelId).toHaveBeenCalled();
    expect(portMock.save).not.toHaveBeenCalled();
  });
});
