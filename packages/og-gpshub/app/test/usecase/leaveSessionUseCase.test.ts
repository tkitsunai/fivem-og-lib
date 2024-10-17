import { LeaveSessionUseCase } from "../../src/lib/usecase/leaveSessionUseCase";
import { PlayerId } from "../../src/lib/domain/player";
import { describe, expect, it, vi } from "vitest";
import { Session } from "../../src/lib/domain/session";
import { ChannelId } from "../../src/lib/domain/channel";
import { SessionPort } from "@/src/lib/port/sessionPort";
import { ChannelNotFoundError } from "@/src/lib/usecase/errors";

describe("leaveSessionUseCase", () => {
  const playerId = 1 as PlayerId;
  const playerId2 = 2 as PlayerId;
  const channel = { id: "channelId" as ChannelId };
  it("should leave session", async () => {
    const mockValue = new Session({ channel, players: [playerId, playerId2] });
    const leavedSession = new Session({ channel, players: [playerId] });
    const leaveSpy = vi.spyOn(mockValue, "leave").mockReturnValue(leavedSession);

    const sessionPortMock: Partial<SessionPort> = {
      save: vi.fn().mockReturnValue(leavedSession),
      findByChannelId: vi.fn().mockReturnValue(mockValue),
      deleteByChannelId: vi.fn(),
    };

    const actual = await new LeaveSessionUseCase(sessionPortMock as SessionPort).execute(
      channel,
      playerId
    );

    expect(sessionPortMock.findByChannelId).toHaveBeenCalledWith(channel.id);
    expect(leaveSpy).toHaveBeenCalledWith(playerId);
    expect(sessionPortMock.save).toHaveBeenCalledWith(leavedSession);
    expect(actual.success).toBeTruthy();
    actual.success && expect(actual.value).toEqual(leavedSession);
  });

  it("should return channel not found, result is failed and have error", async () => {
    const sessionPortMock: Partial<SessionPort> = {
      findByChannelId: vi.fn().mockReturnValue(null),
    };

    const actual = await new LeaveSessionUseCase(sessionPortMock as SessionPort).execute(
      channel,
      playerId
    );

    expect(actual.success).toBeFalsy();
    !actual.success && expect(actual.error).toBeInstanceOf(ChannelNotFoundError);
  });

  it("if session has no player, should, call delete session", async () => {
    const mockValue = new Session({ channel, players: [playerId] });
    const leavedSession = new Session({ channel, players: [] });
    const leaveSpy = vi.spyOn(mockValue, "leave").mockReturnValue(leavedSession);

    const sessionPortMock: Partial<SessionPort> = {
      findByChannelId: vi.fn().mockReturnValue(mockValue),
      deleteByChannelId: vi.fn(),
      save: vi.fn(),
    };

    const actual = await new LeaveSessionUseCase(sessionPortMock as SessionPort).execute(
      channel,
      playerId
    );

    expect(sessionPortMock.findByChannelId).toHaveBeenCalledWith(channel.id);
    expect(leaveSpy).toHaveBeenCalled();
    expect(sessionPortMock.deleteByChannelId).toHaveBeenCalledWith(channel.id);
    expect(sessionPortMock.save).not.toHaveBeenCalled();
    expect(actual.success).toBeTruthy();
  });
});
