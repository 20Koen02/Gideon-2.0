const Event = require("../structures/Event.js");

module.exports = class extends Event {

  async run(guild) {
    if (!guild.available) return;
    this.client.console.log(`A guild has been left: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
  }
};
