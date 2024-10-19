export type ChannelId = string & { __brand: "ChannelId" };

export interface Channel {
  id: ChannelId;
}

export const isValidChannel = (target: Channel): boolean => {
  return target.id.toString().length > 0;
};
