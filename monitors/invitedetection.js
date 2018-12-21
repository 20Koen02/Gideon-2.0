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
		if (!msg.guild || !msg.guild.settings.antiinvite) return;
		if (await msg.hasAtLeastPermissionLevel(6)) return;
		if (!/(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(msg.content)) return;
		return msg.delete()
			.catch(err => {
        this.client.emit('log', err, 'error');
        console.log(err);
      });
	}

};