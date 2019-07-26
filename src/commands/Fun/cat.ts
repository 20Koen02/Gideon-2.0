import { Command } from "klasa";
import { applyOptions } from "../../lib/Util/Util";
import { CommandOptions } from "klasa";
import { KlasaMessage } from "klasa";
import { Embed } from "../../lib/Embed";
import fetch from "node-fetch";

@applyOptions<CommandOptions>({
  description: "Gets a random image from a cat"
})

export default class CatCommand extends Command {

  async run(message:KlasaMessage) {

    const res = await fetch("http://shibe.online/api/cats").then(r => r.json());
    const embed = Embed(message, {
      text: "Powered by: http://shibe.online/",
      footer: true
    });
    
    embed
      .setTitle(":cat: Cat")
      .setImage(res[0]);
    return message.sendEmbed(embed);
  }
}
