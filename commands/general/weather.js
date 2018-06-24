const Command = require("../../structures/Command.js");
const {
    MessageEmbed
} = require("discord.js");
const snekfetch = require("snekfetch");

class Weather extends Command {
    constructor(...args) {
        super(...args, {
            name: "weather",
            usage: "weather",
            description: "Shows the weather"
        });
    }

    async run(message, args) {
        if (args.length === 0) {
            const url = `http://wttr.in/gouda_0tqp_lang=${message.getText("WEATHER_LANGUAGE")}.png`;
            return snekfetch.get(url).then(r => message.channel.send("", { files: [{ attachment: r.body }] }));
        }
        const url = `http://wttr.in/${args.join(" ").replace(' ', '%20')}_0tqp_lang=${message.getText("WEATHER_LANGUAGE")}.png`;
        snekfetch.get(url).then(r => message.channel.send("", { files: [{ attachment: r.body }] }));
    }
}

module.exports = Weather;