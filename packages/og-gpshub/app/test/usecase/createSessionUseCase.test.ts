import { Channel } from "src/lib/domain/channel";
import { PlayerId } from "src/lib/domain/player";
import { SessionPort } from "src/lib/port/sessionPort";
import { CreateSessionUseCase } from "../../src/lib/usecase/createSessionUseCase";
import { describe, expect, it, vi } from "vitest";
import { Session } from "../../src/lib/domain/session";
import { AlreadyExistsSession } from "src/lib/usecase/errors";

describe("createSessionUseCaseTest", () => {
  const param = {
    channel: {
      id: "channelId",
    } as Channel,
    playerId: 1 as PlayerId,
  };

  it("should create a session", async () => {
    const { channel, playerId } = param;
    const session = new Session({
      channel,
      players: [playerId],
    });

    const sessionPortMock: Partial<SessionPort> = {
      save: vi.fn().mockReturnValue(session),
      findByChannelId: vi.fn().mockReturnValue(null),
    };
    const target = new CreateSessionUseCase(sessionPortMock as SessionPort);

    const actual = await target.execute(channel, playerId);
    expect(actual).toEqual({
      success: true,
      value: session,
    });
    expect(sessionPortMock.findByChannelId).toHaveBeenCalled();
    expect(sessionPortMock.save).toHaveBeenCalled();
  });

  it("if already exists session, should return result of Result.success false", async () => {
    const session = new Session({ channel: param.channel, players: [param.playerId] });
    const sessionPortMock: Partial<SessionPort> = {
      save: vi.fn(),
      findByChannelId: vi.fn().mockReturnValue(session),
    };
    const target = new CreateSessionUseCase(sessionPortMock as SessionPort);
    const { channel, playerId } = param;

    const expected = {
      success: false,
      error: new AlreadyExistsSession(),
    };

    const actual = await target.execute(channel, playerId);
    expect(actual).toEqual(expected);
    expect(sessionPortMock.findByChannelId).toHaveBeenCalled();
    expect(sessionPortMock.save).not.toHaveBeenCalled();
  });
});
