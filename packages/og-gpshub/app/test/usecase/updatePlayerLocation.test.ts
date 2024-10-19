import { describe, expect, it, vi } from "vitest";
import { createLocation } from "../helpers/helper";
import { CitizenId } from "@/src/lib/domain/citizen";
import { Session, SessionInfo } from "@/src/lib/domain/session";
import { LocationPort } from "@/src/lib/port/locationPort";
import { SessionPort } from "@/src/lib/port/sessionPort";
import { UpdatePlayerLocationUseCase } from "@/src/lib/usecase/updatePlayerLocationUseCase";
import { Channel } from "@/src/lib/domain/channel";
import { PlayerId } from "@/src/lib/domain/player";
import { PlayerHasNotJoinedError } from "@/src/lib/usecase/errors";

describe("updatePlayerLocation", () => {
  it("should update player location", async () => {
    const session = new Session({
      channel: { id: "channel1" },
    } as SessionInfo);

    const locationPortMock: Partial<LocationPort> = {
      savePlayerLocation: vi.fn(),
    };

    const sessionPortMock: Partial<SessionPort> = {
      findByPlayerId: vi.fn().mockReturnValue(session),
    };

    const target = new UpdatePlayerLocationUseCase(
      locationPortMock as LocationPort,
      sessionPortMock as SessionPort
    );

    const playerId = 1 as PlayerId;
    const citizenId = "C123" as CitizenId;
    const playerLocation = createLocation();

    const actual = await target.execute(playerId, citizenId, playerLocation);

    expect(locationPortMock.savePlayerLocation).toHaveBeenCalledWith(citizenId, playerLocation);
    expect(sessionPortMock.findByPlayerId).toHaveBeenCalled();
    expect(actual.success).toBeTruthy();
    actual.success && expect(actual.value).toEqual({ id: "channel1" } as Channel);
  });

  it("player has not joined to session yet, returning PlayerHasNotJoinedError", async () => {
    const locationPortMock: Partial<LocationPort> = {
      savePlayerLocation: vi.fn(),
    };

    const sessionPortMock: Partial<SessionPort> = {
      findByPlayerId: vi.fn().mockReturnValue(null),
    };

    const target = new UpdatePlayerLocationUseCase(
      locationPortMock as LocationPort,
      sessionPortMock as SessionPort
    );

    const playerId = 1 as PlayerId;
    const citizenId = "C123" as CitizenId;
    const playerLocation = createLocation();

    const actual = await target.execute(playerId, citizenId, playerLocation);

    expect(sessionPortMock.findByPlayerId).toHaveBeenCalled();
    expect(locationPortMock.savePlayerLocation).not.toHaveBeenCalledWith(citizenId, playerLocation);
    expect(actual.success).toBeFalsy();
    !actual.success && expect(actual.error).toEqual(new PlayerHasNotJoinedError());
  });
});
