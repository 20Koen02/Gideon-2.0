const Command = require("../../structures/Command.js");
const {
    MessageEmbed
} = require("discord.js");
const turl = require('turl');

class Shorten extends Command {
    constructor(...args) {
        super(...args, {
            name: "shorten",
            usage: "shorten",
            description: "Shorten an URL",
            cooldown: 5
        });
    }

    async run(message, args) {
        turl.shorten(args[0]).then((res) => {
            const shortEmbed = new MessageEmbed()
                .setColor(message.guild.setting.embedcolor)
                .addField("Short URL:", res)
            return message.channel.send({ embed: shortEmbed });
        }).catch((err) => {
            console.log(err);
        });
    }

}

module.exports = Shorten;