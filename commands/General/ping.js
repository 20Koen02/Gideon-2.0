const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvas-constructor");
const fsn = require("fs-nextra");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            guarded: true,
            description: language => language.get("COMMAND_PING_DESCRIPTION")
        });
    }

    async run(message) {
        // const msg = await message.sendLocale('COMMAND_PING');
        // const pingEmbed = this.client.helpers.Miscs.getEmbed({ color: message.guild.settings.appearance.embedcolor, footer: false });
        // pingEmbed.setDescription(
        // 	`:heartbeat: ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)} ms\n:floppy_disk: ${(process.memoryUsage().heapUsed /
        // 		1024 /
        // 		1024).toFixed(0)} mb`
        // );
        // return message.send({ embed: pingEmbed });

        const msg = await message.sendLocale("PING_FETCH");

        let ping = msg.createdTimestamp - message.createdTimestamp;
        if (ping > 9999) {
            return message.channel.send(":x: Timeout!");
        }

        const processing = await message.sendLocale("PING_PROCESSING");

        const result = await this.ping(ping);
        await message.channel.send(new MessageAttachment(result, "ping.png"));
        processing.delete();
    }

    async ping(ping) {
        let clock = await fsn.readFile("./assets/ping/clock.png");
        let floppy = await fsn.readFile("./assets/ping/floppy.png");

        return new Canvas(200, 70)
            .setColor("#2F3136")
            .addRect(0, 0, 200, 70)
            .setColor("#242528")
            .save()
            .createBeveledClip(10, 10, 85, 50, 15)
            .addRect(10, 10, 85, 50)
            .restore()
            .save()
            .createBeveledClip(105, 10, 85, 50, 15)
            .addRect(105, 10, 85, 50)
            .restore()
            .addImage(clock, 20, 25, 20, 20)
            .addImage(floppy, 115, 25, 20, 20)
            .setColor("#ffffff")
            .setTextFont("15px Ubuntu")
            .addText(`${ping}`, 50, 33)
            .addText(`ms`, 50, 48)
            .addText(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)}`, 145, 33)
            .addText(`mb`, 145, 48)
            .toBuffer();
    }
};
