import { DMChannel, TextChannel, Message, Guild } from "discord.js";
import { GideonClient } from "../..";

export class GideonMessage extends Guild {
  [x: string]: any;

  constructor(client:GideonClient, data:object) {
    super(client, data);

    this.guildSettings = null;
  }
}