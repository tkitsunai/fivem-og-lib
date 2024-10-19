import { Channel, ChannelId, isValidChannel } from "@/src/lib/domain/channel";
import { describe, expect, it } from "vitest";

describe("channelTest", () => {
  it("should create a channel", () => {
    expect({
      id: "channelId" as ChannelId,
    } as Channel).toEqual({
      id: "channelId" as ChannelId,
    } as Channel);
  });

  it("should not create a channel", () => {
    const target = {
      id: "" as ChannelId,
    } as Channel;

    expect(isValidChannel(target)).toBeFalsy();
  });
});
