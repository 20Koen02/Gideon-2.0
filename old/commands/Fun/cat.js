const { Command } = require("klasa");
const request = require("request");

const api = "http://shibe.online/api/cats";

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Gets a random image from a cat"
        });
    }

    async run(message) {
        request(
            {
                url: api,
                json: true
            },
            function(error, response, body) {
                if (response.statusCode === 503) return message.send("503: Service Unavailable");
                if (!error && response.statusCode === 200) {
                    const catEmbed = message.client.helpers.Miscs.getEmbed({
                        color: message.guild.settings.appearance.embedcolor,
                        text: "Powered by: http://shibe.online/",
                        footer: true
                    });
                    catEmbed.setTitle(":cat: Cat").setImage(body[0]);
                    message.sendEmbed(catEmbed);
                }
            }
        );
    }
};
