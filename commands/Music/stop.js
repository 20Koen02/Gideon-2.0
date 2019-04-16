const { MusicCommand } = require("../../lib/Music");

module.exports = class extends MusicCommand {
    constructor(...args) {
        super(...args, {
            description: "Stops the music",
            requireMusic: true
        });
    }

    async run(msg) {
        await msg.guild.music.leave();
        return msg.sendMessage(`Successfully left the voice channel ${msg.guild.me.voice.channel}`);
    }
};
