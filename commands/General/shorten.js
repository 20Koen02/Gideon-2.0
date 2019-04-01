const { Command } = require('klasa');
const turl = require('turl');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			description: 'Shorten an url',
			usage: '<text:...string>'
		});
	}

	async run(message, args) {
		turl
			.shorten(args[0])
			.then((res) => {
				const shortEmbed = this.client.helpers.Miscs.getEmbed({ color: message.guild.settings.embedcolor, footer: false });
				shortEmbed.addField('Short URL:', res);
				return message.channel.send({ embed: shortEmbed });
			})
			.catch((err) => {
				console.log(err);
			});
	}
};
