const { Command } = require('klasa');
const { getDuration } = require('../../lib/Util');

class PlayCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: language => language.get('COMMAND_MUSIC_ADD_DESCRIPTION'),
			usage: '<Song:String>'
		});
		this.customizeResponse('Song', 'Please provide some search term or song URL to add in the queue.');
	}

	async run(msg, song) {
		const { valid, id, type } = this.fetchFromURL(song);
		if (valid) return await this.addSong(msg, id, type);

		const searchResult = await msg.guild.music.search(song, type);
		const songChoices = ['Please type the number of the song you want to be played (1-5). Type `cancel` to exit adding the song.', ''];

		for (let i = 0; i < searchResult.length; i++) {
			const songInfo = searchResult[i];
			songChoices.push(`**${i + 1}.** ${songInfo.title} - (**${getDuration(songInfo.length * 1000)}**)`);
		}
		await msg.channel.send(songChoices.join('\n'));

		try {
			const filter = (res) => {
				if (res.author.id !== msg.author.id) return false;
				if (res.content.toLowerCase() === 'cancel') return true;
				if (isNaN(res.content)) return false;
				if (parseInt(res.content) < 1) return false;
				if (parseInt(res.content) > 5) return false;
				return true;
			};
			const choices = await msg.channel.awaitMessages(filter, { time: 15000, max: 1, errors: ['time'] });
			if (choices.first().content.toLowerCase() === 'cancel') return await msg.send('Adding song discarded...');
			const choice = parseInt(choices.first().content.toLowerCase());
			const song = await this.addSong(msg, searchResult[choice - 1].id);
			if(msg.guild.music.status == "paused" || msg.guild.music.status == "playing") return msg.send(`I added song **${song.title}** to the queue!`);
			await msg.guild.music.play();
			return msg.send(`I am now going to play ${song.title}`);
		} catch (err) {
			console.log(err);
			return await msg.send('Not choosen');
		}
	}

	async addSong(msg, song, type) {
		const addedSong = await msg.guild.music.add(msg.author, song, { force: true, type });
		return addedSong;
	}

	fetchFromURL(url) {
		const youtubeMatch = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^?&"'<> #]+)/gi.exec(url);
		if (youtubeMatch) return { valid: true, id: youtubeMatch[1], type: 'youtube' };
		return { valid: false };
	}

}

module.exports = PlayCommand;
