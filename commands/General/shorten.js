const { Command } = require('klasa');
const { shorten } = require("../../lib/Shorten");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            cooldown: 5,
			description: "Shorten an url"
		});
	}

	async run(message, args) {
        shorten(args[0], (res) => {
            const shortEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .addField("Short URL:", res);
            return message.channel.send({ embed: shortEmbed });
        });

	}

};
