const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js");
const math = require("mathjs");


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            cooldown: 5,
            usage: "<expression:string>",
			description: "Calculate your favorite equations"
		});
	}

	async run(message, args) {
        try {
            if (`${math.eval(args.join(" "))}`.length > 400) {
                throw new Error();
            }
            const mathEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`\`${args.join(" ")} = ${math.eval(args.join(" "))}\``);
            message.channel.send({
                embed: mathEmbed
            });
        } catch (err) {} //eslint-disable-line no-empty

    }

};
