const { Command } = require("klasa");
var kitsu = require("node-kitsu");
const turl = require("turl");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Search for anime on Kitsu",
            usage: "<anime:string>"
        });
    }

    async run(message, args) {
        let results;
        await kitsu.searchAnime(args[0], 0).then(res => {
            results = res;
        });
        if (results.length === 0) return message.send(`Failed to find "${args[0]}"`);
        if (results[0].attributes.nsfw == true) return message.send("NSFW anime searches are disabled.");

        let description = ``;
        let poster, cover;

        let time = ((results[0].attributes.episodeCount * results[0].attributes.episodeLength) / 60)
            .toFixed(2)
            .toString()
            .split(".");
        let hours = Number.parseFloat(time[0]).toFixed(0);
        let minutes = Number.parseFloat((time[1] / 100) * 60).toFixed(0);

        if (results[0].attributes.posterImage.original) {
            poster = await turl.shorten(results[0].attributes.posterImage.original);
        }
        if (results[0].attributes.coverImage.original) {
            cover = await turl.shorten(results[0].attributes.coverImage.original);
        }

        if (results[0].attributes.titles.en_jp) {
            description += `• **Romanized:** ${results[0].attributes.titles.en_jp}\n`;
        }

        if (results[0].attributes.titles.ja_jp) {
            description += `• **Japanese:** ${results[0].attributes.titles.ja_jp}\n`;
        }

        if (results[0].attributes.titles.en) {
            description += `• **English:** ${results[0].attributes.titles.en}\n`;
        }

        if (results[0].attributes.startDate && results[0].attributes.endDate) {
            description += `• **Aired:** ${results[0].attributes.startDate} - ${results[0].attributes.endDate}\n`;
        } else if (results[0].attributes.startDate && !results[0].attributes.endDate) {
            description += `• **Aired:** ${results[0].attributes.startDate}\n`;
        }

        if (results[0].attributes.status == "upcoming") {
            description += `• **Status:** Upcoming\n`;
        } else if (results[0].attributes.status == "finished") {
            description += `• **Status:** Finished\n`;
        } else if (results[0].attributes.status == "current") {
            description += `• **Status:** Currently Airing\n`;
        }

        if (results[0].attributes.episodeCount) {
            description += `• **Episodes:** ${results[0].attributes.episodeCount}\n`;
        }

        if (results[0].attributes.episodeLength && results[0].attributes.episodeCount && !isNaN(minutes)) {
            description += `• **Length:** ${hours} hours and ${minutes} minutes (${
                results[0].attributes.episodeLength
            } minutes each)\n`;
        } else if (results[0].attributes.episodeLength && results[0].attributes.episodeCount && isNaN(minutes)) {
            description += `• **Length:** ${hours} hours (${results[0].attributes.episodeLength} minutes each)\n`;
        } else if (results[0].attributes.episodeLength && !results[0].attributes.episodeCount) {
            description += `• **Length:** ${results[0].attributes.episodeLength} minutes each\n`;
        }

        if (results[0].attributes.showType) {
            description += `• **Type:** ${results[0].attributes.showType}\n`;
        }

        if (results[0].attributes.ageRating && results[0].attributes.ageRatingGuide) {
            description += `• **Rating:** ${results[0].attributes.ageRating} - ${
                results[0].attributes.ageRatingGuide
            }\n`;
        } else if (results[0].attributes.ageRating && !results[0].attributes.ageRatingGuide) {
            description += `• **Rating:** ${results[0].attributes.ageRating}\n`;
        } else if (!results[0].attributes.ageRating && results[0].attributes.ageRatingGuide) {
            description += `• **Rating:** ${results[0].attributes.ageRatingGuide}\n`;
        }

        if (poster) {
            description += `• **Poster:** ${poster}\n`;
        }
        if (cover) {
            description += `• **Cover:** ${cover}\n`;
        }

        if (results[0].attributes.averageRating) {
            description += `• **Rating:** ${results[0].attributes.averageRating}%\n`;
        }

        const animeEmbed = this.client.helpers.Miscs.getEmbed({
            color: message.guild.settings.appearance.embedcolor,
            footer: true,
            text: "Powered by: https://kitsu.io"
        });

        animeEmbed.setTitle(results[0].attributes.canonicalTitle);
        animeEmbed.setURL(`https://kitsu.io/anime/${results[0].id}`);
        if (results[0].attributes.posterImage.small) animeEmbed.setThumbnail(results[0].attributes.posterImage.small);
        animeEmbed.setDescription(description);

        message.sendEmbed(animeEmbed);
    }
};

/* 
.anime One Punch Man 2
.anime Fullmetal Alchemist: Brotherhood
.anime One Piece
.anime Pokemon
*/
