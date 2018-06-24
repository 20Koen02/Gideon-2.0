const Command = require("../../structures/Command.js");

class PlayMusic extends Command {
    constructor(...args) {
        super(...args, {
            description: "Joins the message author's voice channel.",
            usage: "play <song>",
            guildOnly: true
        });
    }

    async run(message, [type]) { //eslint-disable-line unused-vars
        message.channel.send({embed: this.embeds(message, type)});
    }

    embeds(message, type) {
        const embed = this.client.helper.Miscs.Embed()
        embed.setAuthor(this.client.user.username, this.client.user.avatarURL());
        switch (type) {
            case "NO_PERMS_CHANNEL_CONNECT":
                embed.setDescription(message.getText("CLIENT_NO_PERMS_CONNECT"));
                return embed;
            case "NO_PERMS_CHANNEL_SPEAK":
                embed.setDescription(message.getText("CLIENT_NO_PERMS_SPEAK"));
                return embed;
            case "MUSIC_ADD_PLAYLIST":
                embed.setDescription(message.getText("MUSIC_ADD_PLAYLIST"));
                return embed;
            case "MUSIC_TOO_LONG_NORMALUSER":
                embed.setDescription(message.getText("MUSIC_TOO_LONG_NORMALUSER"));
                return embed;
            case "MUSIC_NO_SONG_FOUND":
                embed.setDescription(message.getText("MUSIC_NO_SONG_FOUND"));
                return embed;
            case "USER_NOT_IN_VOICE":
                embed.setDescription(message.getText("USER_NOT_IN_VOICE"));
                return embed;
        }
    }
}

module.exports = PlayMusic;