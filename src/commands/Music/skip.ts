import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";


@applyOptions<CommandOptions>({
  description: "Skip music",
  runIn: ["text"]
})

export default class SkipMusicCommand extends Command {

	async run(message:KlasaMessage) {
    return message;
  }
};
