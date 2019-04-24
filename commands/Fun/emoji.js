const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "<text:...string>",
            description: "Turns text into emoji",
            cooldown: 5
        });
    }

    async run(message, [text]) {
        const maxEmbed = this.client.helpers.Miscs.getEmbed({
            color: message.guild.settings.appearance.embedcolor,
            footer: false
        });
        maxEmbed.setDescription(message.language.get("MAX_CHARS"));
        if (text.length > 25) return message.channel.send({ embed: maxEmbed });
        const minEmbed = this.client.helpers.Miscs.getEmbed({
            color: message.guild.settings.appearance.embedcolor,
            footer: false
        });
        minEmbed.setDescription(message.language.get("MIN_CHARS"));
        if (text.length === 0) return message.channel.send({ embed: minEmbed });
        const input = text.replace(/[A-Za-z]/g, letter => `:regional_indicator_${letter.toLowerCase()}:`);
        const emojis = input.split(" ").join(":white_small_square:");
        const emojisfinal = emojis.split("::").join(": :");
        const generalEmbed = this.client.helpers.Miscs.getEmbed({
            color: message.guild.settings.appearance.embedcolor,
            footer: false
        });
        generalEmbed.setDescription(emojisfinal);
        message.channel.send({ embed: generalEmbed });
    }
};
