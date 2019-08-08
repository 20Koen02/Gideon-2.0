import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import Music from "@lib/GideonMusic/Music";
import { GideonEmbedManager } from "@lib/GideonEmbedManager/GideonEmbedManager";


@applyOptions<CommandOptions>({
  description: "Queue music",
  runIn: ["text"]
})

export default class MusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    if (music.queue.length < 1) return message.send("There is no music in the queue");
    
    return message.sendEmbed(GideonEmbedManager.music().queueEmbed(message, music.queue));
  }
};
