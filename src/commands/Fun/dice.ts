import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import { MessageAttachment } from "discord.js";
import { DiceImage } from "@lib/GideonImageGenerator/GideonImages";

@applyOptions<CommandOptions>({
  cooldown: 5,
  description: "Rolls dices"
})

export default class DiceCommand extends Command {

  async run(message: KlasaMessage) {
    return message.send(new MessageAttachment(await new DiceImage(message).getImage(Math.floor(Math.random() * 6) + 1), "dice.png"));
  }
};