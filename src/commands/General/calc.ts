import { applyOptions } from "@lib/Util/Util";
import { evaluate } from "mathjs";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import { Embed } from "@lib/Embed";

@applyOptions<CommandOptions>({
  cooldown: 5,
  usage: "<expression:string>",
  desc: (i18n) => i18n.get("desc_anime")
})

export default class CalcCommand extends Command {

  async run(message: KlasaMessage, args: any[]) {
    try {
      if (`${evaluate(args.join(" "))}`.length > 400) {
        throw new Error();
      }
      const mathEmbed = Embed(message, {
        footer: true,
        text: "Powered by: https://mathjs.org/"
      });
      mathEmbed
        .addField(":inbox_tray: Expression", `\`\`\`${args.join(" ")}\`\`\``)
        .addField(":outbox_tray: Answer", `\`\`\`${evaluate(args.join(" "))}\`\`\``);

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