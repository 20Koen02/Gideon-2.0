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
        ":8ball: **⇾** :white_check_mark: **Het is zeker**",
        ":8ball: **⇾** :white_check_mark: **Het is zo beslist**",
        ":8ball: **⇾** :white_check_mark: **Zonder twijfel**",
        ":8ball: **⇾** :white_check_mark: **Zeker weten**",
        ":8ball: **⇾** :white_check_mark: **Je kunt erop vertrouwen**",
        ":8ball: **⇾** :white_check_mark: **Volgens mij wel**",
        ":8ball: **⇾** :white_check_mark: **Zeer waarschijnlijk**",
        ":8ball: **⇾** :white_check_mark: **Goed vooruitzicht**",
        ":8ball: **⇾** :white_check_mark: **Ja**",
        ":8ball: **⇾** :white_check_mark: **De wijzer wijst naar ja**",
        ":8ball: **⇾** :question: **Reactie is wazig, probeer opnieuw**",
        ":8ball: **⇾** :question: **Vraag later opnieuw**",
        ":8ball: **⇾** :question: **Het is beter het je nu niet te zeggen**",
        ":8ball: **⇾** :question: **Niet te voorspellen**",
        ":8ball: **⇾** :question: **Concentreer en vraag opnieuw**",
        ":8ball: **⇾** :x: **Reken er niet op**",
        ":8ball: **⇾** :x: **Mijn antwoord is nee**",
        ":8ball: **⇾** :x: **Mijn bronnen zeggen nee**",
        ":8ball: **⇾** :x: **Vooruitzicht is niet zo goed**",
        ":8ball: **⇾** :x: **Zeer twijfelachtig**"
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

module.exports = EightBall;