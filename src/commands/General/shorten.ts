import { applyOptions } from "@lib/Util/Util";
import { Command } from "klasa";
import * as turl from "@lib/URLShortener";
import { CommandOptions } from "klasa";
import { Embed } from "@lib/Embed";
import { KlasaMessage } from "klasa";

@applyOptions<CommandOptions>({
  cooldown: 5,
  desc: (i18n) => i18n.get("desc_rex"),
  usage: "<text:...string>"
})
export default class ShortenCommand extends Command {

  async run(message:KlasaMessage, [text]:[string]) {
    const link = await turl.shorten(text).catch(err => {
      console.error(err);
      return message.send("Error while creating the shortlink, I notified the developers");
    });
    const shortEmbed = Embed(message, {
      footer: true,
      text: "Powered by: https://tinyurl.com/"
    });
    shortEmbed.addField("Short URL:", link);
    return message.sendEmbed(shortEmbed);
  }
};