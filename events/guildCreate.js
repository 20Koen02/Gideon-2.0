const Event = require("../structures/Event.js");
const { guildSettingDefaults } = require(`${process.cwd()}/util/defaultSettings.js`);

module.exports = class extends Event {

  async run(guild) {
    const db = this.client.db;
    if (!guild.available) return;
    this.client.console.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
		let _set = guildSettingDefaults; // eslint-disable-line prefer-const
		_set.id = guild.id;
		await db.create('guilds', guild.id, _set);
  }
};
