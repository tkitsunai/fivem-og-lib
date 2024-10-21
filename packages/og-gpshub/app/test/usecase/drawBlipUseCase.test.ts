import { BlipNumber } from "@/src/lib/domain/blip";
import { PlayerLocation } from "@/src/lib/domain/location";
import { PlayerId, PlayerInfo } from "@/src/lib/domain/player";
import { BlipPort } from "@/src/lib/port/blipPort";
import { DrawBlipUseCase } from "@/src/lib/usecase/drawBlipUseCase";
import { describe, expect, it, vi } from "vitest";

describe("drawBlipUseCaseTest", () => {
  it("should draw player blip", () => {
    const blipPort = {
      // findBlipByPlayerId: vi.fn(),
      drawBlip: vi.fn(),
    } as Partial<BlipPort>;

    const target = new DrawBlipUseCase(blipPort as BlipPort);

    target.execute(
      1 as BlipNumber,
      { x: 1, y: 2, z: 3 } as PlayerLocation,
      { name: "test" } as PlayerInfo
    );

    expect(blipPort.drawBlip).toHaveBeenCalledWith(1, { x: 1, y: 2, z: 3 }, { name: "test" });
  });
});
