const Command = require("../../structures/Command.js");
const {
    MessageAttachment
} = require("discord.js");
const snekfetch = require("snekfetch");
const {
    Canvas
} = require('canvas-constructor');
const fsn = require('fs-nextra');
const {
    resolve,
    join
} = require("path")

class Dice extends Command {
    constructor(...args) {
        super(...args, {
            name: "dice",
            usage: "dice",
            description: "Rolls dices.",
            cooldown: 5
        });
    }

    async run(message) {
        var rng = Math.floor(Math.random() * 6) + 1;
        const result = await this.dice(rng)
        await message.channel.send(new MessageAttachment(result, 'dice.png'));
    }

    async dice(rng) {
        let side
        switch (rng) {
            case 1:
                side = await fsn.readFile('./assets/dice/1.png');
                break
            case 2:
                side = await fsn.readFile('./assets/dice/2.png');
                break
            case 3:
                side = await fsn.readFile('./assets/dice/3.png');
                break
            case 4:
                side = await fsn.readFile('./assets/dice/4.png');
                break
            case 5:
                side = await fsn.readFile('./assets/dice/5.png');
                break
            case 6:
                side = await fsn.readFile('./assets/dice/6.png');
                break
        }

        return new Canvas(110, 70)
        .setColor("#2F3136")
        .addRect(0, 0, 110, 70)
        
        .save()
        .createBeveledClip(50, 20, 50, 30, 10)
        .setColor("#4b4e54")
        .addRect(50, 20, 50, 30)
        .restore()

        .setColor("#242528")

        .save()
        .createBeveledClip(10, 10, 50, 50, 20)
        .addRect(10, 10, 50, 50)
        .restore()

        .addImage(side, 10, 10, 50, 50)

        .setColor("#ffffff")
        .setTextFont('25px Ubuntu')
        .addText(`${rng}`, 70, 43)

        .toBuffer()
    }
}

module.exports = Dice;