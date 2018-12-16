const { Command } = require('klasa');
const { MessageAttachment } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      usage: "[title:string] <content:...string>",
      description: "Generates a minecraft achievement image. Separate with `|`",
      usageDelim: " | ",
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

    const { body } = await this.client.helpers.API.getAchievement(encodeURIComponent(title), encodeURIComponent(contents), Math.floor((Math.random() * 39) + 1));
    message.channel.send(new MessageAttachment(body, "achievement.png"));

	}

};
