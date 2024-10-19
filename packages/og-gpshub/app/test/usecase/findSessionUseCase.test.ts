import { ChannelId } from "@/src/lib/domain/channel";
import { Session, SessionInfo } from "@/src/lib/domain/session";
import { SessionPort } from "@/src/lib/port/sessionPort";
import { FindSessionUseCase } from "@/src/lib/usecase/findSessionUseCase";
import { describe, expect, it, vi } from "vitest";

describe("findSessionUseCase", () => {
  it("should find a session", async () => {
    const session = new Session({} as SessionInfo);

    const sessionPortMock = {
      findByChannelId: vi.fn().mockReturnValue(session),
    } as Partial<SessionPort>;

    const target = new FindSessionUseCase(sessionPortMock as SessionPort);
    const actual = await target.findByChannelId("channelId" as ChannelId);

    expect(actual.success).toBeTruthy();
  });
});
