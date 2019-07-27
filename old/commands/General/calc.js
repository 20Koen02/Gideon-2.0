const { Command } = require("klasa");
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
            const mathEmbed = this.client.helpers.Miscs.getEmbed({
                color: message.guild.settings.appearance.embedcolor,
                footer: true,
                text: "Powered by: https://mathjs.org/"
            });
            mathEmbed
                .addField(":inbox_tray: Expression", `\`\`\`${args.join(" ")}\`\`\``)
                .addField(":outbox_tray: Answer", `\`\`\`${math.eval(args.join(" "))}\`\`\``);

            message.sendEmbed(mathEmbed);
        } catch (err) {
            const failEmbed = this.client.helpers.Miscs.getEmbed({
                color: message.guild.settings.appearance.embedcolor,
                footer: true,
                text: "Powered by: https://mathjs.org/"
            });
            failEmbed.setDescription(":x: Invalid input!");
            message.sendEmbed(failEmbed);
        }
    }
};
