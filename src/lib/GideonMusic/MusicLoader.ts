import { Guild, Client, Message } from "discord.js";
import Music from "./Music";
import Song, { showSeconds } from "./Song";
import { KlasaMessage, KlasaClient, TextPrompt, Usage } from "klasa";

const wildcard = /(?:scsearch:|ytsearch:).*/i;

export default class MusicLoader {
  private guild: Guild;
  private music: Music;
  private client: Client;
  constructor(music:Music, guild:Guild) {
    this.guild = guild;
    this.music = music;
    this.client = guild.client;
  }

  async search(message:Message,song:string) {
    song = song.replace(/<(.+)>/g, "$1");


    const results = [];

    const validLink = this.isLink(song);

    if(validLink) {
      const result = await this.validLinkSearch(song);
      if (result.tracks.length) {
          results.push(...result.tracks);
      } 
    }
    if(wildcard.test(song) && !validLink) {
      const res = await this.wildcardTrack(song);
      results.push(res);
    }

    if (!validLink) {
      const res = await this.searchTrack(message as KlasaMessage, song);
      results.push(res);
    }

    return { tracks: results.map(track => new Song(track, message.author)) };
  }

  private async validLinkSearch(song:string) {
    return this.fetchTracks(song);
  }

  private async wildcardTrack(song:string) {
    const data = await this.fetchTracks(wildcard.exec(song)[0]);
    if (!data || !data.tracks.length) throw "Music not found";
    return data.tracks[0];
  }

  private async searchTrack(message:KlasaMessage, song:string) {
    const data = await this.fetchTracks(`ytsearch:${song}`);
    if (!data || !data.tracks.length) throw "Music not found";

    const songs = data.tracks.slice(0, 5);

    const text = [
      "🎵 | **Select a Song**",
      songs.map((song, index) => `**${++index}.** ${song.info.title} - ${song.info.author} (${showSeconds(song.info.length)})`).join("\n"),
      `${message.author}, Please select a track by replying from range \`1-5\` to add it to the queue.`
    ].join('\n');

    const prompt = new TextPrompt(message, new Usage(this.client as KlasaClient, "<number:integer{1,5}>", ""));
    const [selection] = await prompt.run<[number]>(text);

    if (!songs[selection - 1]) throw `:x: ***Specified track could not be found, please try again with a different one.***`;
    return songs[selection - 1];
  }

  private async fetchTracks(search:string) {
    let result = await this.client.music.search(this.client.player.nodes.first(), `${search}`);
    if (result.loadType === "LOAD_FAILED") throw "There was an error trying to search for that song";
    return { tracks: result.tracks };
  }

  private isLink(link:string) {
    try {
      new URL(link);
      return true;
    } catch (e) {
      return false;
    }
  }
}