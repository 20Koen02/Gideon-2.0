import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_pause"),
  aliases: ["resume"],
  runIn: ["text"]
})

export default class LoopMusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    await music.pause();

    return message.send(`⏯ | **Music has been ${music.paused ? "paused" : "resumed"}!**`);
  }
};
