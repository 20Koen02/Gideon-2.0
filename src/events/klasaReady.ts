import { Event } from "klasa";
import { PlayerManager } from "discord.js-lavalink";
import { SecretConfig } from "@src/config";

export default class extends Event {
  async run() {
    this.client.player = new PlayerManager(this.client, SecretConfig.LavaLinkNodes, {
      user: this.client.user.id,
      shards: 1
    });
  }

}