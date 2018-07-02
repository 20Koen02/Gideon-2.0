const Command = require("../../structures/Command.js");
const {
    MessageEmbed
} = require("discord.js");

class Dice extends Command {
    constructor(...args) {
        super(...args, {
            name: "dice",
            usage: "dice",
            description: "Rolls dices.",
            cooldown: 5
        });
    }

    async run(message, args) {
        var one = Math.floor(Math.random() * 6) + 1;
        var two = Math.floor(Math.random() * 6) + 1;
        var three = Math.floor(Math.random() * 6) + 1;
        var four = Math.floor(Math.random() * 6) + 1;
        var five = Math.floor(Math.random() * 6) + 1;
        var six = Math.floor(Math.random() * 6) + 1;

        if (args.join("") < 1 || args.join("") > 6) {
            const lessEmbed = new MessageEmbed()
                .setDescription('**' + one + '**')
                .setColor(message.guild.setting.embedcolor);
            return message.channel.send({
                embed: lessEmbed
            });
        }
        if (args.join("") == 1) {
            const oneEmbed = new MessageEmbed()
                .setDescription('**' + one + '**')
                .setColor(message.guild.setting.embedcolor);
            return message.channel.send({
                embed: oneEmbed
            });
        }
        if (args.join("") == 2) {
            const twoEmbed = new MessageEmbed()
                .setDescription('**' + one + ' ' + two + '**')
                .setColor(message.guild.setting.embedcolor);
            return message.channel.send({
                embed: twoEmbed
            });
        }
        if (args.join("") == 3) {
            const threeEmbed = new MessageEmbed()
                .setDescription('**' + one + ' ' + two + ' ' + three + '**')
                .setColor(message.guild.setting.embedcolor);
            return message.channel.send({
                embed: threeEmbed
            });
        }
        if (args.join("") == 4) {
            const fourEmbed = new MessageEmbed()
                .setDescription('**' + one + ' ' + two + ' ' + three + ' ' + four + '**')
                .setColor(message.guild.setting.embedcolor);
            return message.channel.send({
                embed: fourEmbed
            });
        }
        if (args.join("") == 5) {
            const fiveEmbed = new MessageEmbed()
                .setDescription('**' + one + ' ' + two + ' ' + three + ' ' + four + ' ' + five + '**')
                .setColor(message.guild.setting.embedcolor);
            return message.channel.send({
                embed: fiveEmbed
            });
        }
        if (args.join("") == 6) {
            const sixEmbed = new MessageEmbed()
                .setDescription('**' + one + ' ' + two + ' ' + three + ' ' + four + ' ' + five + ' ' + six + '**')
                .setColor(message.guild.setting.embedcolor);
            return message.channel.send({
                embed: sixEmbed
            });
        }
    }
}

module.exports = Dice;