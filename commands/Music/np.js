const {
    MusicCommand,
    util: { splitText, getDuration }
} = require("../../lib/Music");
const getInfo = require("util").promisify(require("ytdl-core").getInfo);

module.exports = class extends MusicCommand {
    constructor(...args) {
        super(...args, { description: "Get information from the current song." });
    }

    async run(msg) {
        const { remaining, queue, playing } = msg.guild.music;
        if (!playing) throw `No song playing...`;

        const [song] = queue;
        const info = await getInfo(song.url);
        if (!info.author) info.author = {};

        const npEmbed = this.client.helpers.Miscs.getEmbed({
            color: msg.guild.settings.appearance.embedcolor,
            footer: true,
            text: "Powered by: https://youtu.be/"
        });

        npEmbed
            .setTitle(info.title)
            .setURL(`https://youtu.be/${info.vid}`)
            .setAuthor(info.author.name || "Unknown", info.author.avatar || null, info.author.channel_url || null)
            .setDescription(
                [
                    `**Duration**: ${getDuration(parseInt(info.length_seconds) * 1000)} [Time remaining: ${getDuration(
                        remaining
                    )}]`,
                    `**Description**: ${splitText(info.description, 500)}`
                ].join("\n\n")
            )
            .setThumbnail(info.thumbnail_url);
        msg.sendEmbed(npEmbed);
    }
};
