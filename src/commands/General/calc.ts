import { applyOptions } from "../../lib/Util/Util";
import { evaluate as eval } from "mathjs";

import { CommandOptions, Command, KlasaMessage } from "klasa";
import { Embed } from "../../lib/Embed";

@applyOptions<CommandOptions>({
  cooldown: 5,
  usage: "<expression:string>",
  description: "Calculate your favorite equations"
})

export default class CalcCommand extends Command {

  async run(message: KlasaMessage, args: any[]) {
    try {
      if (`${eval(args.join(" "))}`.length > 400) {
        throw new Error();
      }
      const mathEmbed = Embed(message, {
        footer: true,
        text: "Powered by: https://mathjs.org/"
      });
      mathEmbed
        .addField(":inbox_tray: Expression", `\`\`\`${args.join(" ")}\`\`\``)
        .addField(":outbox_tray: Answer", `\`\`\`${eval(args.join(" "))}\`\`\``);

      return message.sendEmbed(mathEmbed);
    } catch (err) {
      const failEmbed = Embed(message, {
        footer: true,
        text: "Powered by: https://mathjs.org/"
      });
      failEmbed.setDescription(":x: Invalid input!");
      return message.sendEmbed(failEmbed);
    }
  }
};