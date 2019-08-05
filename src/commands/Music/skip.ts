import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import Music from "@lib/GideonMusic/Music";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_skip"),
  runIn: ["text"]
})

export default class SkipMusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    if (music.voiceChannel.members.size > 4) {
      const response = this.handleSkips(music, message.author.id);
      if (response) return message.send(response);
    }

    const [song] = music.queue;
    await music.skip(true);
    return message.send(`🎧 **Skipped Track:** ${song.title}`);
  }

  handleSkips(music:Music, user:string) {
    const [song] = music.queue;
    if (song.skips.has(user)) return "You have already voted to skip this song.";
    song.skips.add(user);
    return this.shouldInhibit(music.voiceChannel.members.size - 1, song.skips.size);
  }

  shouldInhibit(total:number, size:number) {
    if (total <= 3) return true;
    return size >= total * 0.4 ? false : `🔸 | Votes: ${size} of ${Math.ceil(total * 0.4)}`;
  }
};
