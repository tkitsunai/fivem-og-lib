import { BlipNumber } from "@/src/lib/domain/blip";
import { PlayerLocation } from "@/src/lib/domain/location";
import { PlayerId, PlayerInfo } from "@/src/lib/domain/player";
import { BlipPort } from "@/src/lib/port/blipPort";
import { FindBlipUseCase } from "@/src/lib/usecase/findBlipUseCase";
import { describe, expect, it, vi } from "vitest";

describe("findBlipUseCaseTest", () => {
  it("should find blip by player id", async () => {
    const blipPort = {
      findBlipByPlayerId: vi.fn().mockReturnValue(100 as BlipNumber),
    } as Partial<BlipPort>;

    const target = new FindBlipUseCase(blipPort as BlipPort);

    const actual = await target.execute(1 as PlayerId);

    expect(blipPort.findBlipByPlayerId).toHaveBeenCalledWith(1);
    expect(actual).toEqual(100);
  });
});
