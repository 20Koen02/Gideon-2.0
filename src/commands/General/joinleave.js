const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvas-constructor");
//const fsn = require("fs-nextra");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["jl"],
            guarded: true,
            description: "test command"
        });
    }

    async run(message) {

        const result = await this.jl();
        await message.send(new MessageAttachment(result, "jl.png"));
    }

    async jl() {
        return new Canvas(200, 70)
            .setColor("#2F3136")
            .addRect(0, 0, 400, 200)
            .toBuffer();
    }
};
