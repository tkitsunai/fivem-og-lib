export class ChannelNotFoundError extends Error {
  constructor(message: string = "channel not found") {
    super(message);
    this.name = "ChannelNotFoundError";
  }
}

export class SessionNotFoundError extends Error {
  constructor(message: string = "session not found") {
    super(message);
    this.name = "SessionNotFoundError";
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

export class PlayerHasNotJoinedError extends Error {
  constructor(message: string = "player has not joined to session yet") {
    super(message);
    this.name = "PlayerHasNotJoinedError";
  }
}
