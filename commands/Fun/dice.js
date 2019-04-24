const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvas-constructor");
const fsn = require("fs-nextra");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            cooldown: 5,
            description: "Rolls dices"
        });
    }

    async run(message) {
        var rng = Math.floor(Math.random() * 6) + 1;
        const result = await this.dice(rng);
        await message.send(new MessageAttachment(result, "dice.png"));
    }

    async dice(rng) {
        let side;
        side = await fsn.readFile(`./assets/dice/${rng}.png`);

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
            .setTextFont("25px Ubuntu")
            .addText(`${rng}`, 70, 43)
            .toBufferAsync();
    }
};
