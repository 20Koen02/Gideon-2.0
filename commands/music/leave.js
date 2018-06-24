const Command = require("../../structures/Command.js");

class VoiceLeave extends Command {
    constructor(...args) {
        super(...args, {
            description: "Leaves the voice channel.",
            usage: "leave",
            guildOnly: true
        });
    }

    async run(message) {
        const { music } = message.guild;
        await music.leave();

        return message.channel.send(message.getText('VOICE_DISCONNECTED', message.guild.me.voiceChannel));
    }
}

module.exports = VoiceLeave;