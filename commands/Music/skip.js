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
        const { music } = msg.guild;
        return music.skip();
	}

}

module.exports = JoinVCCommand;
