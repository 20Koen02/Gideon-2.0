import { applyOptions } from "../../lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";
import { MessageAttachment } from "discord.js";
import fetch from "node-fetch";

@applyOptions<CommandOptions>({
  usage: "<title:string> [content:...string]",
  description: "Generates a minecraft achievement image. Separate with `|`",
  usageDelim: " | ",
  cooldown: 5
})

export default class AchievementCommand extends Command {

    async run(message:KlasaMessage, [title, contents]:[string, string]) {
        if (!contents) {
            [title, contents] = ["Achievement Get!", title];
        }

        //cuts off part of content when over 21 characters
        if (contents.length > 21) {
            contents = contents
                .split("")
                .slice(0, 21)
                .join("");
        }
        if (title.length > 21) {
            title = title
                .split("")
                .slice(0, 21)
                .join("");
        }
        
        const buffer = await fetch(`https://www.minecraftskinstealer.com/achievement/a.php?i=${Math.floor(Math.random() * 39 + 1)}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`)
          .then(r => r.buffer());
        return message.send(new MessageAttachment(buffer, "achievement.png"));
    }
};
