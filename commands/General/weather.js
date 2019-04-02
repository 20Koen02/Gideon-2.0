const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');
const snekfetch = require('snekfetch');
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const { keys: { owm } } = require('../../config');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			usage: '<city:...string>',
			description: 'Shows the weather for the given city'
		});
	}

	async run(message, [ city ]) {
		const geturl = `http://api.openweathermap.org/data/2.5/weather`;
		try {
			const { body: data } = await snekfetch.get(geturl).query({
				appid: owm,
				q: city,
				units: 'metric'
			});
			const result = await this.weather(data);
			await message.channel.send(new MessageAttachment(result, 'weather.png'));
		} catch (e) {
			console.log(e);
			return message.channel.send(message.language.get('VALID_CITY'));
		}
	}

	async weather(data) {
		let winddir = await fsn.readFile('./assets/weather/winddirection.png');
		let image;
		if (data.weather[0].icon == '01d') {
			image = await fsn.readFile('./assets/weather/sun.png');
		} else if (data.weather[0].icon == '01n') {
			image = await fsn.readFile('./assets/weather/moon.png');
		} else if (data.weather[0].icon == '02d') {
			image = await fsn.readFile('./assets/weather/fewcloudsday.png');
		} else if (data.weather[0].icon == '02n') {
			image = await fsn.readFile('./assets/weather/fewcloudsnight.png');
		} else if (data.weather[0].icon == '03d' || data.weather[0].icon == '03n' || data.weather[0].icon == '04d' || data.weather[0].icon == '04n') {
			image = await fsn.readFile('./assets/weather/clouds.png');
		} else if (data.weather[0].icon == '09d' || data.weather[0].icon == '09n' || data.weather[0].icon == '10d' || data.weather[0].icon == '10n') {
			image = await fsn.readFile('./assets/weather/rain.png');
		} else if (data.weather[0].icon == '11d' || data.weather[0].icon == '11n') {
			image = await fsn.readFile('./assets/weather/thunderstorm.png');
		} else if (data.weather[0].icon == '13d' || data.weather[0].icon == '13n') {
			image = await fsn.readFile('./assets/weather/snow.png');
		} else if (data.weather[0].icon == '50d' || data.weather[0].icon == '50n') {
			image = await fsn.readFile('./assets/weather/mist.png');
		}

		return new Canvas(600, 300)
			.setColor('#2F3136')
			.addRect(0, 0, 600, 500)
			.setColor('#242528')
			.addRect(0, 0, 600, 70)
			.save()
			.createBeveledClip(440, 90, 140, 140, 15)
			.setColor('#242528')
			.addRect(440, 90, 140, 140)
			.restore()
			.save()
			.createBeveledClip(20, 90, 400, 190, 15)
			.setColor('#242528')
			.addRect(20, 90, 400, 190)
			.restore()
			.setColor('#ffffff')
			.setTextFont('37px Ubuntu')
			.addText(`${data.name}, ${data.sys.country}`, 25, 50)
			.addImage(image, 450, 100, 120, 120)
			.setTextFont('23px Ubuntu')
			.addText(`Condition: ${data.weather[0].main}`, 45, 135)
			.addText(`Temperature: ${Math.round(data.main.temp)} °C (${data.main.temp_min} - ${data.main.temp_max})`, 45, 165)
			.addText(`Humidity: ${data.main.humidity}%`, 45, 195)
			.addText(`Wind: ${Math.round(data.wind.speed * 3.6)} km/h`, 45, 225)
			.addText(`Wind Direction: ${Math.round(data.wind.deg)}°`, 45, 255)
			.save()
			.translate(290, 247)
			.rotate(data.wind.deg * Math.PI / 180)
			.translate(-15, -15)
			.addImage(winddir, 0, 0, 30, 30)
			.restore()
			.toBuffer();
	}
};
