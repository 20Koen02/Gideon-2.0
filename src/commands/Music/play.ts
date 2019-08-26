import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import Song from "@lib/GideonMusic/Song";
import { Message, TextChannel } from "discord.js";
import Music from "@lib/GideonMusic/Music";
import { GideonEmbedManager } from "@lib/GideonEmbedManager/GideonEmbedManager";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_play"),
  usage: "<song:song>",
  runIn: ["text"]
})

export default class MusicCommand extends Command {

	async run(message:KlasaMessage, [song]:[{tracks:Song[]}]) {
    if (!message.member.voice.channel) throw message.i18n.get("cmd_music_no_voice");

    if (!message.member.voice.channel.joinable) throw message.i18n.get("cmd_music_no_connect");
    if (!message.member.voice.channel.speakable) throw message.i18n.get("cmd_music_no_speak");

    message.guild.music.textChannel = message.channel as TextChannel;

    await this.handle(message, song);
    return message;
  }

  async handle(message:Message, songs:{tracks:Song[]}) {
    const { music } = message.guild;
    try {
      if (!music.playing) await this.handleSongs(message, songs);
      else return this.handleSongs(message, songs);
      await music.join(message.member.voice.channel.id);
      return this.play(music);
    } catch (error) {
      this.client.console.error(error);
      await music.destroy();
      return message.channel.send(`There was an error: ${error}`);
    }
  }

  async handleSongs(message:Message, songs:{tracks:Song[]}) {
    const { music } = message.guild;
    if (songs.tracks.length > 1) {
      const limitedSongs = songs.tracks.slice(0, 75);
      music.queue.push(...limitedSongs);
      return message.translate("cmd_music_added_songs", {songs: limitedSongs.length });
    } else {
      music.queue.push(...songs.tracks);
      if (!music.playing) return;
      music.playing = true;
      return message.sendEmbed(GideonEmbedManager.music().loadedInqueueEmbed(message, songs.tracks[0], music.queue));
    }
  }

  async play(music:Music) {
    const [song] = music.queue;

    if (!song) {
        if (!music.textChannel || music.textChannel.deleted) return music.destroy();
        await music.textChannel.send(music.guild.i18n.get("cmd_music_empty_queue"));
        return music.destroy();
    }

    const player = await music.play();
    if (!music.looping) await music.textChannel.send(`Now playing: **${song.title}** by **${song.author}**`);

    player.once("end", async data => {
        if (data.reason === "REPLACED") return;
        if (!music.looping) await music.skip(false);
        await this.play(music);
    }).once("error", async event => {
        await music.textChannel.send(`I am very sorry but was an error | Error: ${event.error}`);
        await music.destroy();
    });
  }
};
