const Command = require("../../structures/Command.js");
const { MessageEmbed } = require("discord.js");

class Ping extends Command {
    constructor(...args) {
        super(...args, {
            name: "ping",
            usage: "ping",
            description: "Pong.",
            cooldown: 5
        });
    }

    async run(message) {
      const msg = await message.channel.send(message.getText("URBAN_EXAMPLE"));
      const embed = new MessageEmbed().setColor(message.guild.setting.embedcolor).setDescription(`:clock1: ${msg.createdTimestamp - message.createdTimestamp} ms\n:floppy_disk: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} mb`);
      await msg.edit({ embed: embed }); 
    }
}

module.exports = Ping;