import { applyOptions } from "../../lib/Util/Util";
import { Command } from "klasa";
import * as turl from "../../lib/URLShortener";
import { CommandOptions } from "klasa";
import { Embed } from "../../lib/Embed";
import { KlasaMessage } from "klasa";

@applyOptions<CommandOptions>({
  cooldown: 5,
  description: "Shorten an url",
  usage: "<text:...string>"
})
export default class ShortenCommand extends Command {

  async run(message:KlasaMessage, [text]:[string]) {
    const link = await turl.shorten(text).catch(err => {
      console.error(err);
      return message.send("Error while creating the shortlink, notified the developers");
    });
    const shortEmbed = Embed(message, {
      footer: true,
      text: "Powered by: https://tinyurl.com/"
    });
    shortEmbed.addField("Short URL:", link);
    return message.sendEmbed(shortEmbed);
  }
};