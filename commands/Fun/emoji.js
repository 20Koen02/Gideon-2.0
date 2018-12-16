const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      usage: "<text:...string>",
      description: "Turns text into emoji",
      cooldown: 5
		});
	}

	async run(message, [text]) {
    const maxEmbed = new MessageEmbed()
    .setColor(message.guild.settings.embedcolor || 0x00aaff)
    .setDescription(message.language.get("MAX_CHARS"));
    if (text > 25) return message.channel.send({embed: maxEmbed });
    const minEmbed = new MessageEmbed()
    .setColor(message.guild.settings.embedcolor || 0x00aaff)
    .setDescription(message.language.get("MIN_CHARS"));
    if (text.length === 0) return message.channel.send({ embed: minEmbed });
    const input = text.replace(/[A-Za-z]/g, letter => `:regional_indicator_${letter.toLowerCase()}:`);
    const emojis = input.split(" ").join(":white_small_square:");
    const emojisfinal = emojis.split("::").join(": :");
    const generalEmbed = new MessageEmbed()
    .setColor(message.guild.settings.embedcolor || 0x00aaff)
    .setDescription(emojisfinal);
    message.channel.send({ embed: generalEmbed });

	}

};
