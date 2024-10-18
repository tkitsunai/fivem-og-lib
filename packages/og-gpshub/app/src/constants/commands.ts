export const RegisterCommands = {
  ogAdmin: "ogAdmin",
} as const;

export const SuggestionCommands = {
  help: {
    command: "/ogAdmin help",
    description: "ogAdminのAdmin Helpコマンド",
    args: undefined,
  },
  create: {
    command: "/ogAdmin create",
    description: "create channel session",
    args: [{ name: "channelName", help: "チャネル名を指定します" }],
  },
  join: {
    command: "/ogAdmin join",
    description: "join channel session",
    args: [{ name: "channelName", help: "チャネル名を指定します" }],
  },
  leave: {
    command: "/ogAdmin leave",
    description: "leave from channel session",
    args: [{ name: "channelName", help: "チャネル名を指定します" }],
  },
  locate: {
    command: "/ogAdmin locate",
    description: "locate player",
    args: undefined,
  },
  status: {
    command: "/ogAdmin status",
    description: "confirming server's all session",
    args: undefined,
  },
} as const;
