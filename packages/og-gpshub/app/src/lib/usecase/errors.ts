export class ChannelNotFoundError extends Error {
  constructor(message: string = "channel not found") {
    super(message);
    this.name = "ChannelNotFoundError";
  }
}
