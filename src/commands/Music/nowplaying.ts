import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import { GideonEmbedManager } from "@lib/GideonEmbedManager/GideonEmbedManager";


@applyOptions<CommandOptions>({
  description: "Nowplaying",
  runIn: ["text"],
  aliases: ["np", "currentlyplaying"]
})

export default class LoopMusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    const [song] = music.queue;
    if (!song) return message.translate("cmd_music_no_songs");

    return message.sendEmbed(GideonEmbedManager.music().nowPlayingEmbed(message, song));
  }
};
