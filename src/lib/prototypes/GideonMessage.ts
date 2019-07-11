import { DMChannel, TextChannel, Message } from "discord.js";
import { GideonClient } from "../..";

export class GideonMessage extends Message {

  constructor(client:GideonClient, data:object, channel:DMChannel|TextChannel) {
    super(client, data, channel);

    this.guildSettings = null;
  }
}