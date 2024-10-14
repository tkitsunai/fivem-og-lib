import { Channel } from "src/lib/domain/channel";
import { PlayerId } from "src/lib/domain/player";
import { SessionPort } from "src/lib/port/sessionPort";
import { CreateSessionUseCase } from "../../src/lib/usecase/createSessionUseCase";
import { describe, expect, it, vi } from "vitest";
import { Session } from "../../src/lib/domain/session";

describe("createSessionUseCaseTest", () => {
  const param = {
    channel: {
      id: "channelId",
    } as Channel,
    playerId: "playerId" as PlayerId,
  };

  it("should create a session", () => {
    const saveMock = vi.fn();
    const sessionPortMock: Partial<SessionPort> = {
      save: saveMock,
    };
    const target = new CreateSessionUseCase(sessionPortMock as SessionPort);
    const { channel, playerId } = param;

    const expectValue = new Session({
      channel,
      players: [playerId],
    });

    expect(target.execute(channel, playerId)).toEqual(expectValue);
    expect(saveMock).toHaveBeenCalled();
  });
});
