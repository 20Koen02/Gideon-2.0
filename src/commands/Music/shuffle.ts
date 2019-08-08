import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import Song from "@lib/GideonMusic/Song";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_shuffle"),
  runIn: ["text"]
})

export default class MusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");
    if(music.queue.length <= 2) return message.send(":x: The has less than 2 songs, add more to shuffle them!");

    this.shuffle(music.queue);

    return message.send(":white_check_mark: **Queue has now been shuffled!**");
  }

  shuffle(array:Song[]) {
    const [first] = array;
    array.shift();
    for (let i = array.length - 1; i > 0; i--) {
      const z = Math.floor(Math.random() * (i + 1));
      [array[i], array[z]] = [array[z], array[i]];
    }
    array.unshift(first);
  }
};
