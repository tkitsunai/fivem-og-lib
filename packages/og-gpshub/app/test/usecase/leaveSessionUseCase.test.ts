import { LeaveSessionUseCase } from "../../src/lib/usecase/leaveSessionUseCase";
import { PlayerId } from "../../src/lib/domain/player";
import { describe, expect, it, vi } from "vitest";
import { Session } from "../../src/lib/domain/session";
import { ChannelId } from "../../src/lib/domain/channel";
import { SessionPort } from "@/src/lib/port/sessionPort";

describe("leaveSessionUseCase", () => {
  const playerId = 1 as PlayerId;
  const channel = { id: "channelId" as ChannelId };
  it("should leave session", async () => {
    const mockValue = new Session({ channel, players: [playerId] });
    const leavedSession = new Session({ channel, players: [] });
    const leaveSpy = vi.spyOn(mockValue, "leave").mockReturnValue(leavedSession);

    const sessionPortMock: Partial<SessionPort> = {
      save: vi.fn().mockReturnValue(leavedSession),
      findByChannelId: vi.fn().mockReturnValue(mockValue),
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
});
