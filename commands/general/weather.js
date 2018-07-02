const Command = require("../../structures/Command.js");
const {
    MessageAttachment
} = require("discord.js");
const snekfetch = require("snekfetch");

class Weather extends Command {
    constructor(...args) {
        super(...args, {
            name: "weather",
            usage: "weather",
            description: "Shows the weather",
            cooldown: 5
        });
    }

    async run(message, args) {
        if (args.length === 0) {
            const {
                body
            } = await snekfetch.get(`https://wttr.in/gouda_0tqp_lang=${message.getText("WEATHER_LANGUAGE")}.png`);
            await message.channel.send(new MessageAttachment(body, "weather-gouda.png"));
        } else {
            const {
                body
            } = await snekfetch.get(`https://wttr.in/${args.join(" ").replace(' ', '%20')}_0tqp_lang=${message.getText("WEATHER_LANGUAGE")}.png`);
            await message.channel.send(new MessageAttachment(body, `weather-${args.join(" ")}.png`));
        }
    }
}

module.exports = Weather;