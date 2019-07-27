const { Command } = require("klasa");
// const request = require("request");

const api = "https://dog.ceo/api/breeds/image/random";

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Gets a random image from a dog"
        });
    }

    async run(message) {
        /*
        request(
            {
                url: api,
                json: true
            },
            function(error, response, body) {
                if (response.statusCode === 503) return message.send("503: Service Unavailable");
                if (!error && response.statusCode === 200) {
                    const dogEmbed = message.client.helpers.Miscs.getEmbed({
                        color: message.guild.settings.appearance.embedcolor,
                        text: "Powered by: https://dog.ceo/",
                        footer: true
                    });
                    dogEmbed.setTitle(":dog: Dog").setImage(body.message);
                    message.sendEmbed(dogEmbed);
                }
            }
        );*/
    }
};
