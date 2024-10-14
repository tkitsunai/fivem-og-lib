import { ChannelId } from "../domain/channel";
import { PlayerId } from "../domain/player";
import { Session, SessionId } from "../domain/session";
import { createNewSessionLocation, Location, PlayerLocation } from "../domain/location";
import { SessionPort } from "../port/sessionPort";

export class SessionUseCase {
  constructor(private readonly sessionPort: SessionPort) {}
}
