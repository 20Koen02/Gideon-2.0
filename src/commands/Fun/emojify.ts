import { Command, CommandOptions, KlasaMessage } from "klasa";
import { applyOptions } from "@lib/Util/Util";
import { Embed } from "@lib/Embed";

@applyOptions<CommandOptions>({
  usage: "<text:...string>",
  description: "Turns text into emoji",
  cooldown: 5
})

export default class EmojifyCommand extends Command {
  async init() {
    this.customizeResponse("text", message =>
    message.i18n.get("cmd_emojify_min_chars") as string);
  }
  
  async run(message:KlasaMessage, [text]:[string]) {
    const embed = Embed(message, {
      footer: false
    });
    if (text.length > 25) return message.sendEmbed(embed.setDescription(message.i18n.get("cmd_emojify_max_chars")));
    const input = text.replace(/[A-Za-z]/g, letter => `:regional_indicator_${letter.toLowerCase()}:`);
    const emojis = input.split(" ").join(":white_small_square:");
    embed.setDescription(emojis.split("::").join(": :")); 
    return message.sendEmbed(embed);
  }
};