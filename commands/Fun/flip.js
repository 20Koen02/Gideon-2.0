const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			description: 'Rolls dices'
		});
	}

	async run(message) {
		let flipoutcome = message.language.get('FLIP')[Math.floor(Math.random() * message.language.get('FLIP').length)];

		let result;
		if (flipoutcome == message.language.get('FLIP')[0]) {
			result = await this.heads();
		} else if (flipoutcome == message.language.get('FLIP')[1]) {
			result = await this.tails();
		}

		await message.channel.send(new MessageAttachment(result, 'flip.png'));
	}

	async heads() {
		let headsimg = await fsn.readFile('./assets/flip/heads.png');

		return new Canvas(170, 70)
			.setColor('#2F3136')
			.addRect(0, 0, 170, 70)
			.save()
			.createBeveledClip(50, 20, 100, 30, 10)
			.setColor('#4b4e54')
			.addRect(50, 20, 100, 30)
			.restore()
			.setColor('#242528')
			.save()
			.addCircle(35, 35, 25)
			.restore()
			.addImage(headsimg, 10, 10, 50, 50)
			.setColor('#7fa5ff')
			.setTextFont('25px Ubuntu')
			.addText(`Heads`, 70, 43)
			.toBufferAsync();
	}

	async tails() {
		let tailsimg = await fsn.readFile('./assets/flip/tails.png');

		return new Canvas(170, 70)
			.setColor('#2F3136')
			.addRect(0, 0, 170, 70)
			.save()
			.createBeveledClip(50, 20, 100, 30, 10)
			.setColor('#4b4e54')
			.addRect(50, 20, 100, 30)
			.restore()
			.setColor('#242528')
			.save()
			.addCircle(35, 35, 25)
			.restore()
			.addImage(tailsimg, 10, 10, 50, 50)
			.setColor('#ff8282')
			.setTextFont('25px Ubuntu')
			.addText(`Tails`, 70, 43)
			.toBufferAsync();
	}
};
