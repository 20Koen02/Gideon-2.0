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

class Ping extends Command {
    constructor(...args) {
        super(...args, {
            name: "ping",
            usage: "ping",
            description: "Pong.",
            cooldown: 5
        });
    }

    async run(message) {
        const msgone = await message.channel.send(message.getText("PING_FETCH"));
        
        const msgtwo = await message.channel.send(message.getText("PING_PROCESSING"))

        if ((msgtwo.createdTimestamp - msgone.createdTimestamp) > 9999) {
            return message.channel.send(":x: Could not fetch ping!")
        }
        if ((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)) {
            
        }
        const result = await this.ping(msgone, msgtwo);
        msgone.delete();
        await message.channel.send(new MessageAttachment(result, 'ping.png'));
        msgtwo.delete();
    }

    async ping(msgone, msgtwo) {

        
        let clock = await fsn.readFile('./assets/ping/clock.png');
        let floppy = await fsn.readFile('./assets/ping/floppy.png');

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
        .setTextFont('15px Ubuntu')
        .addText(`${msgtwo.createdTimestamp - msgone.createdTimestamp}`, 50, 33)
        .addText(`ms`, 50, 48)

        .addText(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)}`, 145, 33)
        .addText(`mb`, 145, 48)

        .toBuffer()
    }
}

module.exports = Ping;