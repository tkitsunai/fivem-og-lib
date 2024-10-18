type Name = string;

export type CitizenName = {
  firstName: Name;
  lastName: Name;
};

export type CitizenId = string;

export type Citizen = {
  id: CitizenId;
  name: CitizenName;
};
