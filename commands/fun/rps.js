const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");
const { get } = require("snekfetch");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const { resolve, join } = require("path")

class Rps extends Command {
    constructor(...args) {
        super(...args, {
            name: "rps",
            usage: "rps",
            description: "Play a game of Rock-Paper-Scissors",
            cooldown: 5
        });
    }

    async run(message, args) {
        if (args[0].toLowerCase() != "r" && args[0].toLowerCase() != "p" && args[0].toLowerCase() != "s")  return message.channel.send(":x: Please choose r, p or s.")
        let rng = Math.floor(Math.random() * 3) + 1;

        let result, player;
        switch (args[0].toLowerCase()) {
            case "r":
                result = this.r(rng)
                player = "rock"
                break
            case "p":
                result = this.p(rng)
                player = "paper"
                break
            case "s":
                result = this.s(rng)
                player = "scissors"
                break
        }

        let me;
        switch (rng) {
            case 1:
                me = "rock"
                break
            case 2:
                me = "paper"
                break
            case 3:
                me = "scissors"
                break
        }


        let won;
        switch (result) {
            case 1: 
                won = "you"
                break
            case 2:
                won = "me"
                break
            case 3:
                won = "nobody"
                break
        }

        //message.channel.send(`You: ${player}\nMe: ${me}\nWon: ${won}`);
        const canvasresult = await this.rpscanvas(message)
        await message.channel.send(new MessageAttachment(canvasresult, 'rps.png'));

    }
    
    async rpscanvas(message) {
        const [vs, { body: bot }, { body: player }] = await Promise.all([
			fsn.readFile('./assets/rps/versus.png'),
			get(this.client.user.avatarURL({ format: 'png', size: 128 })),
			get(message.author.displayAvatarURL({ format: 'png', size: 128 }))
		]);

        return new Canvas(600, 500)
        .setColor("#2F3136")
        .addRect(0, 0, 600, 500)


        .save()
        .setColor("#242528")
        .setShadowColor("rgba(22, 22, 22, 1)")
        .setShadowOffsetY(5)
        .setShadowBlur(10)
        .addCircle(121, 119, 62)
        .addCircle(481, 119, 62)
        .addImage(vs, 220, 50, 150, 150)
        .restore()
        

        .save()
        .addImage(bot, 55, 55, 128, 128, { type: 'round', radius: 64 })
        .restore()
        .save()
        .addImage(player, 415, 55, 128, 128, { type: 'round', radius: 64 })
        .restore()


        .toBuffer()

    }

    r(num) {
        switch (num) {
            case 1:
                return 3
            case 2:
                return 2
            case 3:
                return 1
        }
    }

    p(num) {
        switch (num) {
            case 1:
                return 1
            case 2:
                return 3
            case 3:
                return 2
        }
    }

    s(num) {
        switch (num) {
            case 1:
                return 2
            case 2:
                return 1
            case 3:
                return 3
        }
    }


}

module.exports = Rps;