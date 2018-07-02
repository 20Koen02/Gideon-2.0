const Command = require("../../structures/Command.js");

class PlayMusic extends Command {
    constructor(...args) {
        super(...args, {
            description: "Joins the message author's voice channel.",
            usage: "play <song>",
            guildOnly: true
        });
        this.delayer = time => new Promise(res => setTimeout(() => res(), time));
    }

    async run(message, [...song]) { //eslint-disable-line no-unused-vars
        const {
            music
        } = message.guild;
        if (!song.join(" ")) return message.channel.send({
            embed: this.embeds(message, "NO_ARGUMENTS")
        })
        if (!message.member.voiceChannel) return message.channel.send({
            embed: this.embeds(message, "USER_NOT_IN_VOICE")
        });
        this.voiceChannel = message.member.voiceChannel;
        const permissions = this.voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send({
                embed: this.embeds(message, "CLIENT_NO_PERMS_CONNECT")
            });
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send({
                embed: this.embeds(message, "CLIENT_NO_PERMS_SPEAK")
            });
        }
        music.status = "playing";
        music.channel = message.channel;
        let videos = await music.youtube.searchVideos(song, 1);
        await music.addSong(message.author, videos[0].id);
        return this.play(music, message);
    }

    embeds(message, type) {
        const embed = this.client.helper.Miscs.Embed()
            .setAuthor(this.client.user.username, this.client.user.avatarURL());
        switch (type) {
            case "NO_PERMS_CHANNEL_CONNECT":
                embed.setColor(0xffa500)
                    .setDescription(message.getText("CLIENT_NO_PERMS_CONNECT"));
                return embed;
            case "NO_PERMS_CHANNEL_SPEAK":
                embed.setColor(0xffa500)
                    .setDescription(message.getText("CLIENT_NO_PERMS_SPEAK"));
                return embed;
            case "MUSIC_ADD_PLAYLIST":
                embed.setColor(0x00ff00)
                    .setDescription(message.getText("MUSIC_ADD_PLAYLIST"));
                return embed;
            case "MUSIC_ADDED":
                embed.setColor(0x00ff00)
                    .setDescription(message.getText("MUSIC_ADDED"));
                return embed;
            case "MUSIC_TOO_LONG_NORMALUSER":
                embed.setColor(0xff0000)
                    .setDescription(message.getText("MUSIC_TOO_LONG_NORMALUSER"));
                return embed;
            case "MUSIC_NO_SONG_FOUND":
                embed.setColor(0xff0000)
                    .setDescription(message.getText("MUSIC_NO_SONG_FOUND"));
                return embed;
            case "USER_NOT_IN_VOICE":
                embed.setColor(0xff0000)
                    .setDescription(message.getText("USER_NOT_IN_VOICE"));
                return embed;
            case "NO_ARGUMENTS":
                embed.setColor(0xff0000)
                    .setDescription(message.getText("NO_ARGUMENTS"));
                return embed;
        }
    }
    async play(musicInterface, msg) {
        if (musicInterface.status !== 'playing') return null;

        const song = musicInterface.queue[0];

        if (!song) {
            if (musicInterface.autoplay) return this.autoPlayer(musicInterface).then(() => this.play(musicInterface, msg));
            return musicInterface.channel.send("Queue is leeg");
        }

        musicInterface.channel.send({
            embed: this.embeds(msg, "MUSIC_ADDED")
        });
        await this.delayer(300);

        return musicInterface.playSong()
            .then(
                (dispatcher) => dispatcher
                .on('end', () => {
                    musicInterface.skip();
                    return this.play(musicInterface, msg);
                })
                .on('error', (err) => {
                    musicInterface.channel.send('Something very weird happened! Sorry for the incovenience :(');
                    console.log(err);
                    musicInterface.skip();
                    this.play(musicInterface, msg);
                })
            );
    }
}

module.exports = PlayMusic;