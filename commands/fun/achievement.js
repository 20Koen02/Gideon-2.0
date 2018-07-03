const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Achievement extends Command {
    constructor(...args) {
        super(...args, {
            name: "achievement",
            usage: "achievement",
            description: "Generates a minecraft achievement image. Separate with `|`",
            cooldown: 5
        });
    }

    async run(message, args) {
        let [title, contents] = args.join(" ").split(" | ");
        if(!contents) {
          [title, contents] = ["Achievement Get!", title];
        }
        
        //cuts off part of content when over 21 characters
        if(contents.length > 21) {
            contents = contents.split("").slice(0, 21).join("");
        }
        if(title.length > 21) {
            title = title.split("").slice(0, 21).join("");
        }

        const { body } = await this.client.helper.API.getAchievement(encodeURIComponent(title), encodeURIComponent(contents), Math.floor((Math.random() * 39) + 1));
        message.channel.send(new MessageAttachment(body, "achievement.png"));
    }
}

module.exports = Achievement;