const {
	Structures
} = require("discord.js");
const MusicLib = require('../lib/Music');
module.exports = Structures.extend("Guild", Guild => class extends Guild {
	constructor(...args) {
		super(...args);
		this.music = new MusicLib(this);
	}

	get language() {
		return this.setting.language;
	}

	async getSetting() {
		const db = this.client.db;
		const result = await db.get('guilds', this.id);
		return result;
	}

	async updateSetting(key, value) {
		const db = this.client.db;
		const result = await db.get('guilds', this.id);
		result[key] = value;
		await db.update('guilds', this.id, result);
		this.setting = await this.getSetting();
		return this.setting;
	}
});