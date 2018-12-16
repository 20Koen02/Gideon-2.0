const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      description: "Gives you a random fortune",
      cooldown: 5
		});
	}

	async run(message) {
    const embed = new MessageEmbed()
            .setDescription(message.language.get("FORTUNES")[Math.floor(Math.random() * message.language.get("FORTUNES").length)])
            .setColor(message.guild.settings.embedcolor || 0x00aaff);
        message.channel.send({ embed: embed });

	}

};
