const Command = require("../../structures/Command.js");
const {
    MessageEmbed
} = require("discord.js");

class Emoji extends Command {
    constructor(...args) {
        super(...args, {
            name: "emoji",
            usage: "emoji",
            description: "Turns text into emoji's"
        });
    }

    async run(message, args) {
        const maxEmbed = new MessageEmbed()
        .setColor(message.guild.setting.embedcolor)
        .setDescription("The maximal amount of characters is 50.");
        if (args.join(" ").length > 50) return message.channel.send({embed: maxEmbed});
        const minEmbed = new MessageEmbed()
        .setColor(message.guild.setting.embedcolor)
        .setDescription("Please provide text to turn into emoji's");
        if (args.join(" ").length === 0) return message.channel.send({embed: minEmbed});
        const input = args.join(" ").replace(/[A-Za-z]/g, letter => `:regional_indicator_${letter.toLowerCase()}:`);
        const emojis = input.split(" ").join(":white_small_square:");
        const emojisfinal = emojis.split("::").join(": :");
        const generalEmbed = new MessageEmbed()
        .setColor(message.guild.setting.embedcolor)
        .setDescription(emojisfinal);
        message.channel.send({embed: generalEmbed});
    }
}

module.exports = Emoji;