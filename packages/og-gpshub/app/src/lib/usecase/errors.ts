export class ChannelNotFoundError extends Error {
  constructor(message: string = "channel not found") {
    super(message);
    this.name = "ChannelNotFoundError";
  }
}

export class AlreadyExistsSession extends Error {
  constructor(message: string = "already exists session") {
    super(message);
    this.name = "AlreadyExistsSession";
  }
}

export class AlreadyJoinedPlayerError extends Error {
  constructor(message: string = "already joined player") {
    super(message);
    this.name = "AlreadyJoinedPlayerError";
  }
}
