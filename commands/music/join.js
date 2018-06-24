const Command = require("../../structures/Command.js");

class VoiceJoin extends Command {
    constructor(...args) {
        super(...args, {
            description: "Joins the message author's voice channel.",
            usage: "join",
            guildOnly: true
        });
    }

    async run(message) {
        const { voiceChannel } = message.member;
        if (!voiceChannel) return message.channel.send(message.getText("VOICE_NO_CHANNEL_USER"));

        const { music } = message.guild;
        await music.join(voiceChannel);

        return message.channel.send(message.getText('VOICE_CONNECTED', voiceChannel));
    }
}

module.exports = VoiceJoin;