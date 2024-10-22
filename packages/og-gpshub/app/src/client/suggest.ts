import { SuggestionCommands } from "../constants/commands";

export class Suggest {
  constructor() {
    Object.values(SuggestionCommands).forEach((suggestion) => {
      TriggerEvent(
        "chat:addSuggestion",
        suggestion.command,
        suggestion.description,
        suggestion.args || []
      );
    });
  }
}
