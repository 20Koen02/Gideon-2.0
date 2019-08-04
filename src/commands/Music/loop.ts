import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("cmd_loop_desc"),
  usage: "[queue|song]",
  runIn: ["text"]
})

export default class LoopMusicCommand extends Command {

	async run(message:KlasaMessage, [looptype = "song"]:["song"|"queue"]) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    if (looptype === "song") {
      music.looping = !music.looping;
    } else {
      if (music.queue.length * 2 > 1000) return message.translate("cmd_music_loop_max");
      music.queue = music.queue.concat(music.queue);
    }
    return message.translate("cmd_music_loop_start", { queuetype: looptype, looping: music.looping ? "enabled" : "disabled" });
  }
};
