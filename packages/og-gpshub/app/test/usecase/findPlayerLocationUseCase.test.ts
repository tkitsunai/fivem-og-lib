import { ChannelId } from "@/src/lib/domain/channel";
import { PlayerAndLocations } from "@/src/lib/domain/location";
import { PlayerId } from "@/src/lib/domain/player";
import { Session, SessionInfo } from "@/src/lib/domain/session";
import { LocationPort } from "@/src/lib/port/locationPort";
import { SessionPort } from "@/src/lib/port/sessionPort";
import { ChannelNotFoundError } from "@/src/lib/usecase/errors";
import { FindPlayerLocationUseCase } from "@/src/lib/usecase/findPlayerLocationUseCase";
import { describe, expect, it, vi } from "vitest";

describe("findPlayerLocationUseCase", () => {
  it("should return player locations", async () => {
    const locations = [
      {
        playerId: 1,
        location: {
          x: 1,
          y: 2,
          z: 3,
        },
      } as PlayerAndLocations,
      {
        playerId: 2,
        location: {
          x: 4,
          y: 5,
          z: 6,
        },
      } as PlayerAndLocations,
    ];

    const sessionPort = {
      findByChannelId: vi.fn().mockReturnValue(
        new Session({
          channel: { id: "1" },
          players: [1 as PlayerId, 2 as PlayerId],
        } as SessionInfo)
      ),
    } as Partial<SessionPort>;

    const locationPort = {
      findPlayerLocatoios: vi.fn().mockReturnValue(locations),
    } as Partial<LocationPort>;
    const target = new FindPlayerLocationUseCase(
      locationPort as LocationPort,
      sessionPort as SessionPort
    );

    const actual = await target.findByChannelId("1" as ChannelId);

    expect(sessionPort.findByChannelId).toHaveBeenCalledWith("1" as ChannelId);
    expect(locationPort.findPlayerLocatoios).toHaveBeenCalledWith([1 as PlayerId, 2 as PlayerId]);
    expect(actual.success).toBeTruthy();
    actual.success && expect(actual.value).toEqual(locations);
  });

  it("if not found channel's session, returning channel not found", async () => {
    const sessionPort = {
      findByChannelId: vi.fn().mockReturnValue(null),
    } as Partial<SessionPort>;

    const locationPort = {
      findPlayerLocatoios: vi.fn(),
    } as Partial<LocationPort>;

    const target = new FindPlayerLocationUseCase(
      locationPort as LocationPort,
      sessionPort as SessionPort
    );

    const actual = await target.findByChannelId("1" as ChannelId);

    expect(sessionPort.findByChannelId).toHaveBeenCalledWith("1" as ChannelId);
    expect(locationPort.findPlayerLocatoios).not.toHaveBeenCalled();
    expect(actual.success).toBeFalsy();
    !actual.success && expect(actual.error).toBeInstanceOf(ChannelNotFoundError);
  });
});
