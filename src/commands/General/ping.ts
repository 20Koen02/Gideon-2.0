import { applyOptions } from "@lib/Util/Util";
import { CommandOptions } from "klasa";
import { Command, KlasaMessage } from "klasa";
import { PingImage } from "@lib/GideonImageGenerator/GideonImages";
import { MessageAttachment } from "discord.js";


@applyOptions<CommandOptions>({
  description: "Ping",
  guarded: true
})

export default class PingCommand extends Command {

	async run(message:KlasaMessage) {
		const msg = await message.send("Fetching ping...") as KlasaMessage;

    const ping = msg.createdTimestamp - message.createdTimestamp;
    if (ping > 9999) {
      return message.send(":x: Timeout!");
    }
    
    const processing = await message.send("Processing image...") as KlasaMessage;

    await message.send(new MessageAttachment(await new PingImage(message).getImage(ping), "ping.png"));
    await processing.delete();
  }
};
