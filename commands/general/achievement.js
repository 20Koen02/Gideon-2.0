const Command = require("../../structures/Command.js");
const snekfetch = require("snekfetch");
const { MessageEmbed } = require("discord.js");

class Achievement extends Command {
    constructor(...args) {
        super(...args, {
            name: "achievement",
            usage: "achievement",
            description: "Generates a minecraft achievement image. Separate with `|`"
        });
    }

    async run(message, args) {
        let [title, contents] = args.join(" ").split(" | ");
        if(!contents) {
          [title, contents] = ["Achievement Get!", title];
        }
  
        let rnd = Math.floor((Math.random() * 39) + 1);
  
        if(title.length > 22 || contents.length > 22) {
          return message.reply("The maximum length of the title and description is 22 characters.");
        }
        const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
        snekfetch.get(url).then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
    }
}

module.exports = Achievement;