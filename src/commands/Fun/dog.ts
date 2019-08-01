import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command } from "klasa";
import { KlasaMessage } from "klasa";
import { Embed } from "@lib/Embed";
import fetch from "node-fetch";

@applyOptions<CommandOptions>({
  description: "Gets a random image from a dog"
})

export default class DogCommand extends Command {
  async run(message:KlasaMessage) {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = await res.json();
    if(res.status === 503) return message.send("503: Service Unavailable");
    const embed = Embed(message, { footer: true, text: "Powered by: https://dog.ceo" })
      .setTitle(":dog: Dog")
      .setImage(json.message);
    return message.sendEmbed(embed);
    }
};
