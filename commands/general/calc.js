const Command = require("../../structures/Command.js");
const { MessageEmbed } = require("discord.js");

class Calc extends Command {
    constructor(...args) {
        super(...args, {
            name: "calc",
            usage: "calc",
            description: "Calculate your favorite equations"
        });
    }

    async run(message, args) {
        if (args.length >= 3 || args.toLowerCase() == "pi") {
            try {
              if (`${math.eval(args.string)}`.length > 400) {
                throw new Error();
              }
              const mathEmbed = new MessageEmbed().setColor(message.guild.setting.embedcolor).setFooter('Aangevraagd door: ' + message.author.username, message.author.avatarURL).setDescription(`\`${args.string} = ${math.eval(args.string)}\``);
              message.channel.send({embed:mathEmbed});
            } catch (err) {} //eslint-disable-line no-empty
          }
    }
}

module.exports = Calc;