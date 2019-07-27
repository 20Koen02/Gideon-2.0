const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Gives you a random fortune",
            cooldown: 5
        });
    }

    async run(message) {
        const ballEmbed = this.client.helpers.Miscs.getEmbed({
            color: message.guild.settings.appearance.embedcolor,
            footer: false
        });
        ballEmbed.setDescription(
            message.language.get("FORTUNES")[Math.floor(Math.random() * message.language.get("FORTUNES").length)]
        );

        message.send({ embed: ballEmbed });
    }
};
