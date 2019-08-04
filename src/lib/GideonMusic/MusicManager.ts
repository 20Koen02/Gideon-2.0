import { Collection, Guild } from "discord.js";
import Music from "./Music";
import { LavalinkNode } from "discord.js-lavalink";
import fetch from "node-fetch";
import { LavaLinkTrack } from "./Song";

export default class MusicManager extends Collection<string, Music> {

  add(guild:Guild) {
    if(this.has(guild.id)) return this.get(guild.id);
    const guildInterface = new Music(guild);
    this.set(guild.id, guildInterface);
    return guildInterface;
  }

  search(node:LavalinkNode, search:string) : Promise<{ playlistInfo: object, loadType: string, tracks: LavaLinkTrack[] }> {
    const params = new URLSearchParams();
    params.append("identifier", search);

    return fetch(`http://${node.host}:${node.port}/loadtracks?${params}`, { headers: { Authorization: node.password } })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
            return null;
        });

  }
}