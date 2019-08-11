import { Guild, Client, TextChannel } from "discord.js";
import MusicLoader from "./MusicLoader";
import Song from "./Song";

export default class Music {
  client: Client;
  guild: Guild;
  textChannel?: TextChannel;
  queue: Song[];
  playing: boolean;
  paused: boolean;
  looping: boolean;
  loader: MusicLoader;
  volume: number;
  constructor(guild:Guild) {
    this.client = guild.client;
    this.guild = guild;

    this.textChannel = null;
    this.queue = [];
    this.playing = false;
    this.paused = false;
    this.looping = false;
    this.volume = 100;

    this.loader = new MusicLoader(this, guild);
  }

  join(voiceChannel:string) {
    if (!this.node) throw new Error("NO_NODES_AVAILABLE: There are no nodes available to use.");
    return this.client.player.join({
        guild: this.guild.id,
        channel: voiceChannel,
        host: this.node.host
    });
  }

  async leave() {
    await this.client.player.leave(this.guild.id);
    this.playing = false;
  }

  async play() {
    if (!this.player) throw "Something went wrong, try again.";
    else if (!this.queue.length) throw "Can't play songs from an empty queue. Queue up some songs!";

    const [song] = this.queue;

    await this.player.play(song.track);

    this.playing = true;
    return this.player;
  }

  async skip(force = true) {
    if (this.player && force) await this.player.stop();
    else this.queue.shift();
  }

  async pause() {
    if (!this.player) return null;
    const paused = !this.paused;
    await this.player.pause(paused);
    this.paused = paused;
    return paused;
  }

  async setVolume(volume:number) {
    if (this.playing) await this.player.volume(volume);
    this.volume = volume;
    return volume;
  }

  clearQueue() {
    this.queue = [];
    return this;
  }

  async destroy() {
    this.queue = [];
    this.playing = null;
    this.paused = null;
    this.textChannel = null;
    this.looping = null;
    
    await this.leave();
    this.client.music.delete(this.guild.id);
  }

  get voiceChannel() {
    return this.guild.me ? this.guild.me.voice.channel : null;
  }

  get player() {
    return this.client.player.players.get(this.guild.id) || null;
  }

  get node() {
    return this.client.player.idealNodes.first() || null;
  }

}