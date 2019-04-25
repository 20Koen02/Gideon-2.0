const { MusicCommand } = require("../../lib/Music");
const analyrics = require("analyrics");
const {
    keys: { genius }
} = require("../../config");
analyrics.setToken(genius);
const turl = require("turl");

module.exports = class extends MusicCommand {
    constructor(...args) {
        super(...args, {
            description: "Gets the lyrics of the current song based on the search input.",
            requireMusic: true
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        const [song] = music.queue;

        if (!music.playing) throw "I am not playing anything...";

        analyrics.getSong(song.userArg, async function(song) {
            try {
                if (song.lyrics.length <= 2048) {
                    msg.send(song.lyrics);
                } else if (song.lyrics.length > 2048) {
                    let lyr = await turl.shorten(song.url);
                    msg.send(`Lyrics is too long to send! Please go here for the lyrics: <${lyr}>`);
                }
            } catch (error) {
                msg.send(error);
            }
        });
    }
};
