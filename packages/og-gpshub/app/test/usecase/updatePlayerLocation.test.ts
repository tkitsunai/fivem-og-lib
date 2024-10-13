import { describe, expect, it, vi } from "vitest";
import { UpdatePlayerLocationUseCase } from "../../src/lib/usecase/updatePlayerLocationUseCase";
import { SessionPort } from "../../src/lib/port/sessionPort";
import { PlayerId } from "../../src/lib/domain/player";
import { createLocation, createSession } from "../helpers/helper";

describe("updatePlayerLocation", () => {
  it("should update player location", async () => {
    const mockSession = createSession();
    const updatePlayerLocationMock = vi.fn();
    mockSession.updatePlayerLocation = updatePlayerLocationMock;
    const findByPlayerIdMock = vi.fn().mockResolvedValue(mockSession);
    const saveMock = vi.fn();

    const mockSessionPort: Partial<SessionPort> = {
      findByPlayerId: findByPlayerIdMock,
      save: saveMock,
    };

    const target = new UpdatePlayerLocationUseCase(mockSessionPort as SessionPort);

    await target.execute("player" as PlayerId, createLocation());

    expect(findByPlayerIdMock).toHaveBeenCalled();
    expect(updatePlayerLocationMock).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalled();
  });
});
