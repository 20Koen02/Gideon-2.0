import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage, RichDisplay } from "klasa";
import { SecretConfig } from "@src/config";
import Lyrics from "@lib/Lyrics/Lyrics";
import { MessageEmbed } from "discord.js";

const _lyrics = new Lyrics(SecretConfig.lyrics);

@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_lyrics"),
  runIn: ["text"]
})

export default class MusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    const [song] = music.queue;
    if (!song) return message.translate("cmd_music_no_songs");

    const songs = await _lyrics.search(song.title, { page: 1 });
    const { lyrics } = await _lyrics.song(songs[0].id, { fetchLyrics: true, textFormat: "dom" }) as { lyrics: string};

    const rd = new RichDisplay();
    const array = lyrics.split("\n\n");
    const lyricsArray = new Array;
    array.forEach((verse, i) => {
      if(verse.length > 2048) {
        let s1 = verse.slice(0, Math.ceil(verse.length / 2));
        let s2 = verse.slice(Math.ceil(verse.length / 2));

        lyricsArray.push(s1, s2)
      } else {
        lyricsArray.push(verse)
      }
    });

    console.log(lyricsArray)

    lyricsArray.forEach(l => {
      rd.addPage(this.embed(l))
    });
    await rd.run(await message.send(`**Music lyrics**`) as KlasaMessage);
    
  }

  private embed(lyrics:string) {
    return new MessageEmbed().setDescription(lyrics);
  }
};
