import { describe, expect, it, vi } from "vitest";
import { UpdatePlayerLocationUseCase } from "../../src/lib/usecase/updatePlayerLocationUseCase";
import { SessionPort } from "../../src/lib/port/sessionPort";
import { PlayerId } from "../../src/lib/domain/player";
import { createLocation, createSession } from "../helpers/helper";

describe("updatePlayerLocation", () => {
  it("should update player location", async () => {
    // TODO
    expect(true).toBe(true);
  });
});
