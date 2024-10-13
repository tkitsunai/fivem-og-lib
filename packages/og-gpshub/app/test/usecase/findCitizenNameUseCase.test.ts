import { describe, expect, it, vi } from "vitest";
import { FindCitizenNameUseCase } from "../../src/lib/usecase/findCitizenNameUseCase";
import { CitizenPort } from "../../src/lib/port/citizenPort";

describe("FindCitizenNameUseCase", () => {
  it("should find citizen name", () => {
    const findCitizenMock = vi.fn().mockReturnValue({
      firstName: "john",
      lastName: "doe",
    });

    const port = {
      findCitizen: findCitizenMock,
    };

    const actual = new FindCitizenNameUseCase(port as CitizenPort).execute();

    expect(actual).toEqual({
      firstName: "john",
      lastName: "doe",
    });

    expect(findCitizenMock).toHaveBeenCalled();
  });
});
