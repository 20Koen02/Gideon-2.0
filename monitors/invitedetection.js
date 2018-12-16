const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			name: 'invitedetection',
			enabled: true,
			ignoreSelf: true,
			ignoreOthers: false
		});
	}

	async run(msg) {
		if (!msg.guild || !msg.guild.settings.antiinvite) return console.log("Hi");
		if (await msg.hasAtLeastPermissionLevel(6)) return console.log("test");
		if (!/(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(msg.content)) return console.log("help");
		return msg.delete()
			.catch(err => {
        this.client.emit('log', err, 'error');
        console.log(err);
      });
	}

};