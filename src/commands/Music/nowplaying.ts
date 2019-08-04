import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import { GideonEmbedManager } from "@lib/GideonEmbedManager/GideonEmbedManager";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("cmd_np_desc"),
  runIn: ["text"],
  aliases: ["np", "currentlyplaying"]
})

export default class NPMusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    const [song] = music.queue;
    if (!song) return message.translate("cmd_music_no_songs");

    return message.sendEmbed(GideonEmbedManager.music().nowPlayingEmbed(message, song));
  }
};
