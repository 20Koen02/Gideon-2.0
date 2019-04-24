const { Command } = require("klasa");
const turl = require("turl");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            cooldown: 5,
            description: "Shorten an url",
            usage: "<text:...string>"
        });
    }

    async run(message, args) {
        turl.shorten(args[0])
            .then(res => {
                const shortEmbed = this.client.helpers.Miscs.getEmbed({
                    color: message.guild.settings.appearance.embedcolor,
                    footer: true,
                    text: "Powered by: https://tinyurl.com/"
                });
                shortEmbed.addField("Short URL:", res);
                return message.sendEmbed(shortEmbed);
            })
            .catch(err => {
                console.log(err);
            });
    }
};
