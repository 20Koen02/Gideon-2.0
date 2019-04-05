const { Command } = require('klasa');
var kitsu = require('node-kitsu');
const turl = require('turl');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: 'Search for anime on MyAnimeList',
			usage: '<anime:string>'
		});
	}

	async run(message, args) {
		let results;

		await kitsu.searchAnime(args[0], 0).then((res) => {
			results = res;
		});

		if (results.length === 0) return message.channel.send(`Failed to find "${args[0]}"`);

		let time = (results[0].attributes.episodeCount * results[0].attributes.episodeLength / 60).toFixed(2).toString().split('.');
		let hours = time[0];
		let minutes = time[1] / 100 * 60;
		let lenghtText = `${hours} hours and ${minutes} minutes (${results[0].attributes.episodeLength} minutes each)`;
		let status = 'Finished';
		let endDate = ` - ${results[0].attributes.endDate}`;
		let episodes = `\n• **Episodes:** ${results[0].attributes.episodeCount}`;

		if (isNaN(minutes)) lenghtText = `${hours} hours (${results[0].attributes.episodeLength} minutes each)`;

		if (results[0].attributes.endDate === null) {
			status = 'Currently Airing';
			endDate = '';
			episodes = '';
			lenghtText = `${results[0].attributes.episodeLength} minutes each`;
		}

		let poster = await turl.shorten(results[0].attributes.posterImage.original);
		let cover = await turl.shorten(results[0].attributes.coverImage.original);

		console.log(poster);

		let tba = '';
		if (results[0].attributes.tba) {
			tba = `\n• **To Be Aired:** ${results[0].attributes.tba}`;
		}

		const animeEmbed = this.client.helpers.Miscs.getEmbed({ color: message.guild.settings.embedcolor, footer: false });
		animeEmbed.setTitle(results[0].attributes.canonicalTitle).setThumbnail(results[0].attributes.posterImage.small).setDescription(`
            • **Romanized:** ${results[0].attributes.titles.en_jp}
            • **Japanese:** ${results[0].attributes.titles.ja_jp}
            • **English:** ${results[0].attributes.titles.en}
            • **Aired:** ${results[0].attributes.startDate} ${endDate}
            • **Status:** ${status} ${episodes}
            • **Lenght:** ${lenghtText}
            • **Type:** ${results[0].attributes.showType}
            • **Rating:** ${results[0].attributes.ageRating} - ${results[0].attributes.ageRatingGuide}
            • **Poster:** ${poster}
            • **Cover:** ${cover}
            • **Rating:** ${results[0].attributes.averageRating}%${tba}
            
            
            `);

		message.channel.send({
			embed: animeEmbed
		});
	}
};
