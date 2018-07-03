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

class Flip extends Command {
    constructor(...args) {
        super(...args, {
            name: "flip",
            usage: "flip",
            description: "Heads or tails.",
            cooldown: 5
        });
    }

    async run(message) {
        let flipoutcome = message.getText("FLIP")[Math.floor(Math.random() * message.getText("FLIP").length)]

        let result;
        if(flipoutcome == message.getText("FLIP")[0]) {
            result = await this.heads()
        } else if (flipoutcome == message.getText("FLIP")[1]) {
            result = await this.tails()
        }

        await message.channel.send(new MessageAttachment(result, 'flip.png'));
    }

    async heads() {

        let headsimg = await fsn.readFile('./assets/flip/heads.png');

        return new Canvas(170, 70)
        .setColor("#2F3136")
        .addRect(0, 0, 170, 70)
        
        .save()
        .createBeveledClip(50, 20, 100, 30, 10)
        .setColor("#4b4e54")
        .addRect(50, 20, 100, 30)
        .restore()

        .setColor("#242528")

        .save()
        .addCircle(35, 35, 25)
        .restore()

        .addImage(headsimg, 10, 10, 50, 50)

        .setColor("#7fa5ff")
        .setTextFont('25px Ubuntu')
        .addText(`Heads`, 70, 43)

        .toBuffer()
    }

    async tails() {

        let tailsimg = await fsn.readFile('./assets/flip/tails.png');

        return new Canvas(170, 70)
        .setColor("#2F3136")
        .addRect(0, 0, 170, 70)
        
        .save()
        .createBeveledClip(50, 20, 100, 30, 10)
        .setColor("#4b4e54")
        .addRect(50, 20, 100, 30)
        .restore()

        .setColor("#242528")

        .save()
        .addCircle(35, 35, 25)
        .restore()

        .addImage(tailsimg, 10, 10, 50, 50)

        .setColor("#ff8282")
        .setTextFont('25px Ubuntu')
        .addText(`Tails`, 70, 43)

        .toBuffer()
    }
}

module.exports = Flip;