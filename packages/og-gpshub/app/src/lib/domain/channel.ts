export type ChannelId = string & { __brand: "ChannelId" };

export interface Channel {
  id: ChannelId;
}
