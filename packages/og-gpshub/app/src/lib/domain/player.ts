export type PlayerServerId = number & { __brand: "PlayerId" };
export type CitizenId = string & { __brand: "CitizenId" };
export type Name = string;
export type PlayerId = PlayerServerId | CitizenId;

export class PlayerName {
  constructor(
    private readonly firstName?: Name,
    private readonly lastName?: Name,
    private readonly singleName?: Name
  ) {}

  static fromFullName(firstName: Name, lastName: Name): PlayerName {
    return new PlayerName(firstName, lastName, undefined);
  }

  static fromSingleName(singleName: Name): PlayerName {
    return new PlayerName(undefined, undefined, singleName);
  }

  getFullName(): Name {
    if (this.isSingle()) {
      return this.singleName!!;
    }
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }
    throw new Error("Name is not defined");
  }

  private isSingle(): boolean {
    return this.singleName !== undefined;
  }
}

export type Player = {
  id: PlayerId;
  name: PlayerName;
};

export type PedId = number;

export type PlayerPed = {
  pedId: PedId;
};
