import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_skip"),
  runIn: ["text"]
})

export default class SkipMusicCommand extends Command {

	async run(message:KlasaMessage) {
    return message;
  }
};
