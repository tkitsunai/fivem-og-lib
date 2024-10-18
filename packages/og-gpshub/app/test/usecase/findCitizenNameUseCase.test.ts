import { describe, expect, it, vi } from "vitest";
import { FindCitizenUseCase } from "../../src/lib/usecase/findCitizenNameUseCase";
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

    const actual = new FindCitizenUseCase(port as CitizenPort).findCitizen();

    expect(actual).toEqual({
      firstName: "john",
      lastName: "doe",
    });

    expect(findCitizenMock).toHaveBeenCalled();
  });
});
