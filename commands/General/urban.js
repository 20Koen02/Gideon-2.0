const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js");
const urbanjs = require('urban.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      usage: "<content:...string>",
      description: "Urban Dictionary",
      cooldown: 5
		});
	}

	async run(message, args) {
    try {
      const urban = await urbanjs(args.join(""));
      if (urban.example != "") {
        const defEmbed = new MessageEmbed()
          .setColor(message.guild.settings.embedcolor || 0x00aaff)
          .addField(message.language.get("URBAN_DEFINITION", capitalize(urban.word)), `${capitalize(urban.definition)}`)
          .addField(message.language.get("URBAN_EXAMPLE"), `*${capitalize(urban.example)}*`);
        return message.channel.send({ embed: defEmbed });
      } else {
        const defXEmbed = new MessageEmbed()
          .setColor(message.guild.settings.embedcolor || 0x00aaff)
          .addField(message.language.get("URBAN_DEFINITION", capitalize(urban.word)), `${capitalize(urban.definition)}`);
        return message.channel.send({ embed: defXEmbed });
      }
    } catch(e) { // eslint-disable-line no-unused-vars
      console.log(e);
      const noDefEmbed = new MessageEmbed()
        .setColor(message.guild.settings.badembedcolor || 0xff0000)
        .setDescription(message.language.get("URBAN_WORD_NOT_FOUND"));
      message.channel.send({ embed: noDefEmbed });
    }
	}

};

const capitalize = (str) => {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}
