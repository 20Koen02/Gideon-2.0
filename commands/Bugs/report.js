const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js");


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            cooldown: 5,
            usage: "<title:string> <desc:...string>",
            description: "Report a bug in the bot",
            usageDelim: " "
		});
	}

	async run(message, args) {
        const title = args.join(" ").split("|")[0];
        const desc = args.join(" ").split("|")[1];
        this.client.trello.addCard(title, desc, "5c1cda6b6d90432a5baea309", function (error, trelloCard) {
            if (error) {
                console.log('Could not add card:', error);
            }
            else {
                console.log('Added card:', trelloCard);
            }
        })

    }

};
