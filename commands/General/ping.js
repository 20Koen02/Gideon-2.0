const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			guarded: true,
			description: (language) => language.get('COMMAND_PING_DESCRIPTION')
		});
	}

	async run(message) {
		const msg = await message.sendLocale('COMMAND_PING');
		const pingEmbed = this.client.helpers.Miscs.getEmbed({ color: message.guild.settings.embedcolor, footer: false });
		pingEmbed.setDescription(
			`:heartbeat: ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)} ms\n:floppy_disk: ${(process.memoryUsage().heapUsed /
				1024 /
				1024).toFixed(0)} mb`
		);
		return message.send({ embed: pingEmbed });
	}
};
