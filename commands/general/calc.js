const Command = require("../../structures/Command.js");
const {
    MessageEmbed
} = require("discord.js");
const math = require("mathjs");

class Calc extends Command {
    constructor(...args) {
        super(...args, {
            name: "calc",
            usage: "calc",
            description: "Calculate your favorite equations",
            cooldown: 5
        });
    }

    async run(message, args) {
        try {
            if (`${math.eval(args.join(" "))}`.length > 400) {
                throw new Error();
            }
            const mathEmbed = new MessageEmbed()
                .setColor(message.guild.setting.embedcolor)
                .setDescription(`\`${args.join(" ")} = ${math.eval(args.join(" "))}\``);
            message.channel.send({
                embed: mathEmbed
            });
        } catch (err) {} //eslint-disable-line no-empty
    }
}

module.exports = Calc;