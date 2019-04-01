const { Command } = require('klasa');
const math = require('mathjs');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			usage: '<expression:string>',
			description: 'Calculate your favorite equations'
		});
	}

	async run(message, args) {
		try {
			if (`${math.eval(args.join(' '))}`.length > 400) {
				throw new Error();
			}
			const mathEmbed = this.client.helpers.Miscs.getEmbed({ color: message.guild.settings.embedcolor, footer: false });
			mathEmbed.setDescription(`\`${args.join(' ')} = ${math.eval(args.join(' '))}\``);
			message.channel.send({
				embed: mathEmbed
			});
		} catch (err) {} //eslint-disable-line no-empty
	}
};
