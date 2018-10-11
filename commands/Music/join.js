const { Command } = require('klasa');

class JoinVCCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['CONNECT', 'SPEAK'],
			desciption: language => language.get('COMMAND_MUSIC_JOIN_DESCRIPTION')
		});
	}

	async run(msg) {
		const { member: { voice : { channel } } } = msg;
		if (!channel) throw 'You are not connected in a voice channel.';

		const { music } = msg.guild;
		await music.join(channel);

		return msg.send(`Successfully joined voice channel **${channel.name}**`);
	}

}

module.exports = JoinVCCommand;
