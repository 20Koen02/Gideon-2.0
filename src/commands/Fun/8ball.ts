import { applyOptions } from "../../lib/Util/Util";
import { CommandOptions, Command } from "klasa";
import { KlasaMessage } from "klasa";
import { Embed } from "../../lib/Embed";

@applyOptions<CommandOptions>({
  description: "Gives you a random fortune",
  cooldown: 5
})

export default class EightBallCommand extends Command {

  async run(message:KlasaMessage) {
    const ballEmbed = Embed(message, {
      footer: false
    });
    ballEmbed.setDescription(message.i18n.get("fortunes")[Math.floor(Math.random() * message.i18n.get("fortunes").length)]);

    return message.send({ embed: ballEmbed });
  }
};