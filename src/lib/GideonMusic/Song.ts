import { User } from "discord.js";

export default class Song {
  requester: User;
  track: string;
  title: string;
  url: string;
  id: string; 
  seekable: boolean;
  author: string;
  duration: number;
  stream: boolean;
  position: number;
  artwork: string;
  skips: Set<unknown>;
  constructor(data: LavaLinkTrack, requester: User) {

    this.requester = requester;
    this.track = data.track;

    this.title = data.info.title;
    this.url = data.info.uri;
    this.id = data.info.identifier;
    this.seekable = data.info.isSeekable;
    this.author = data.info.author;
    this.duration = data.info.isStream ? 0 : data.info.length;
    this.stream = data.info.isStream;
    this.position = data.info.position;
    this.artwork = data.info.artwork;
    this.skips = new Set();
  }

  get friendlyDuration() {
    return this.stream ? "Live Stream" : showSeconds(this.duration);
  }

  toJSON() {
    return {
      track: this.track,
      info: {
        identifier: this.id,
        isSeekable: this.seekable,
        author: this.author,
        length: this.duration,
        isStream: this.stream,
        position: this.position,
        title: this.title,
        uri: this.url
      }
    };
  }
}

export const showSeconds = (ms: number) => {
  const sec = Math.floor((ms / 1000) % 60).toString();
  const min = Math.floor((ms / (1000 * 60)) % 60).toString();
  const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
  return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}

export interface LavaLinkTrack {
  track: string;
  info: LavaLinkTrackInfo;
}

interface LavaLinkTrackInfo {
  identifier: string;
  isSeekable: boolean;
  author: string;
  length: number;
  isStream: boolean;
  position: number;
  title: string;
  uri: string;
  artwork?: string;
}

interface SongInfo {
  track: string;
  title: string;
  url: string;
  artwork: string;
  id: string;
  seekable: boolean;
  author: string;
  duration: number;
  friendlyDuration: string;
  stream: boolean;
  position: number;
}