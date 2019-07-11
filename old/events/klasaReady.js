const { Event } = require('klasa');

class KlasaReadyEvent extends Event {

	async run() {
		this.client.events.get('verbose').enable();
		console.log(`Ready to server ${this.client.users.size} users across ${this.client.guilds.size} guilds as ${this.client.user.tag}`);
	}

	async init() {
		this.updateCommandValues();
	}

	updateCommandValues() {
		// disabling some default commands
		this.client.commands.get('info').unload();
		this.client.commands.get('userconf').unload();
		this.client.commands.get('blacklist').unload();
		this.client.commands.get('conf').unload();
		this.client.commands.get('unload').unload();
		// hiding some admin commands
		this.client.commands.get('disable').hidden = true;
		this.client.commands.get('enable').hidden = true;
		this.client.commands.get('eval').hidden = true;
		this.client.commands.get('load').hidden = true;
		this.client.commands.get('reboot').hidden = true;
		this.client.commands.get('reload').hidden = true;
		this.client.commands.get('transfer').hidden = true;
	}

}

module.exports = KlasaReadyEvent;