const { Command } = require("klasa");
// const urbanjs = require("urban.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "<content:...string>",
            description: "Urban Dictionary",
            cooldown: 5
        });
    }

    async run(message, args) {
        /*
        try {
            const urban = await urbanjs(args.join(""));
            if (urban.example != "") {
                const defEmbed = this.client.helpers.Miscs.getEmbed({
                    color: message.guild.settings.appearance.embedcolor,
                    footer: true,
                    text: "Powered by: https://urbandictionary.com"
                });
                defEmbed
                    .addField(
                        message.language.get("URBAN_DEFINITION", capitalize(urban.word)),
                        `${capitalize(urban.definition)}`
                    )
                    .addField(message.language.get("URBAN_EXAMPLE"), `*${capitalize(urban.example)}*`);
                return message.send({ embed: defEmbed });
            } else {
                const defXEmbed = this.client.helpers.Miscs.getEmbed({
                    color: message.guild.settings.appearance.embedcolor,
                    footer: true,
                    text: "Powered by: https://urbandictionary.com"
                });
                defXEmbed.addField(
                    message.language.get("URBAN_DEFINITION", capitalize(urban.word)),
                    `${capitalize(urban.definition)}`
                );
                return message.send({ embed: defXEmbed });
            }
        } catch (e) {
            // eslint-disable-line no-unused-vars
            const noDefEmbed = this.client.helpers.Miscs.getEmbed({
                color: message.guild.settings.appearance.embedcolor,
                footer: true,
                text: "Powered by: https://urbandictionary.com"
            });
            noDefEmbed.setDescription(message.language.get("URBAN_WORD_NOT_FOUND"));
            message.send({ embed: noDefEmbed });
        }*/
    }
};

const capitalize = str => {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
};
