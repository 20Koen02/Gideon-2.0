const { MusicCommand } = require("../../lib/Music");

module.exports = class extends MusicCommand {
    constructor(...args) {
        super(...args, {
            description: "Resumes the current song.",
            requireMusic: true
        });
    }

    async run(msg) {
        if (msg.guild.music.idling) throw "Music is not playing";
        if (msg.guild.music.playing) throw "Song already playing!";

        msg.guild.music.resume();
        return msg.sendMessage("▶ Resumed");
    }
};
