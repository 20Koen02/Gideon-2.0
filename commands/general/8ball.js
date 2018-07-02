const Command = require("../../structures/Command.js");
const {MessageEmbed} = require("discord.js");

class EightBall extends Command {
    constructor(...args) {
        super(...args, {
            name: "8ball",
            usage: "8ball",
            description: "Gives you a random fortune"
        });
    }

    async run(message) {

        const embed = new MessageEmbed()
            .setDescription(message.getText("FORTUNES")[Math.floor(Math.random() * message.getText("FORTUNES").length)])
            .setColor(message.guild.setting.embedcolor);
        message.channel.send({ embed: embed });
    }
}



module.exports = EightBall;