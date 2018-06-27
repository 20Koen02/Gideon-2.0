const Command = require("../../structures/Command.js");
const {MessageEmbed} = require("discord.js");

class EightBall extends Command {
    constructor(...args) {
        super(...args, {
            name: "8ball",
            usage: "8ball",
            description: "Gives you a random fortune"
        });
    }

    async run(message) {
        
        const embed = new MessageEmbed()
            .setDescription(do8ball())
            .setColor(message.guild.setting.embedcolor);
        message.channel.send({ embed: embed});
    }
}

function do8ball() {
    var fortunes = [
        "🎱 **⇾** It is certain.",
        "🎱 **⇾** It is decidedly so.",
        "🎱 **⇾** Without a doubt.",
        "🎱 **⇾** Yes definitely.",
        "🎱 **⇾** You may rely on it.",
        "🎱 **⇾** As I see it, yes.",
        "🎱 **⇾** Most likely.",
        "🎱 **⇾** Outlook good.",
        "🎱 **⇾** Yes.",
        "🎱 **⇾** Signs point to yes.", 
        "🎱 **⇾** Reply hazy try again.",
        "🎱 **⇾** Ask again later.",
        "🎱 **⇾** Better not tell you now.",
        "🎱 **⇾** Cannot predict now.",
        "🎱 **⇾** Concentrate and ask again.",
        "🎱 **⇾** Don't count on it.",
        "🎱 **⇾** My reply is no.",
        "🎱 **⇾** My sources say no.",
        "🎱 **⇾** Outlook not so good.",
        "🎱 **⇾** Very doubtful."
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

module.exports = EightBall;