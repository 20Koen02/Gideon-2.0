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
    if (!message.member.voice.channel) throw "I'm sorry but you need to be in a voice channel to play music!";

    if (!message.member.voice.channel.joinable) throw "I do not have enough permissions to connect to your voice channel. I am missing the CONNECT permission.";
    if (!message.member.voice.channel.speakable) throw "I can connect... but not speak. Please turn on this permission so I can emit music.";

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
      return music.textChannel.send(`There was an error: ${error}`);
    }
  }

  async handleSongs(message:Message, songs:{tracks:Song[]}) {
    const { music } = message.guild;
    if (songs.tracks.length > 1) {
      const limitedSongs = songs.tracks.slice(0, 75);
      music.queue.push(...limitedSongs);
      return message.send(`🎧 | **Queue:** Added **${limitedSongs.length}** songs to the queue.`);
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
        await music.textChannel.send("Stopped playing");
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
