export const RegisterCommands = {
  ogadmin: "ogadmin",
} as const;

export const SuggestionCommands = {
  help: {
    command: "/ogadmin help",
    description: "ogadminのAdmin Helpコマンド",
    args: undefined,
  },
  create: {
    command: "/ogadmin create",
    description: "create channel session",
    args: [{ name: "channelName", help: "チャネル名を指定します" }],
  },
  join: {
    command: "/ogadmin join",
    description: "join channel session",
    args: [{ name: "channelName", help: "チャネル名を指定します" }],
  },
  leave: {
    command: "/ogadmin leave",
    description: "leave from channel session",
    args: [{ name: "channelName", help: "チャネル名を指定します" }],
  },
  locate: {
    command: "/ogadmin locate",
    description: "locate player",
    args: undefined,
  },
  status: {
    command: "/ogadmin status",
    description: "confirming server's all session",
    args: undefined,
  },
} as const;
