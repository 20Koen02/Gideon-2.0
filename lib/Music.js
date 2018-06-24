const ytdl = require('ytdl-core');
const {
    Util
} = require('discord.js');
const apiKey = process.env.YOUTUBE_API;
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey);

module.exports = class InterfaceMusic {

    constructor(guild) {
        Object.defineProperty(this, 'client', {
            value: guild.client
        });
        Object.defineProperty(this, 'guild', {
            value: guild
        });

        this.recentlyPlayed = new Array(10);
        this.queue = [];
        this.channel = null;

        this.dispatcher = null;

        this.autoplay = false;
        this.repeat = false;
        this.next = null;

        this.status = 'idle';
    }

    // bot joining the voice channel
    join(voiceChannel) {
        voiceChannel.join()
            .catch((err) => {
                if (String(err).includes('ECONNRESET')) return 'There was an issue connecting to the voice channel.';
                this.client.console.log(`error: ${err}`, 'error');
                return err;
            });
        return voiceChannel;
    }

    // bot leaving the voice channel
    async leave() {
        if (!this.voiceChannel) return 'I am not in a voice channel.';
        this.dispatcher = null;
        this.status = 'idle';

        await this.voiceChannel.leave();
        return this;
    }

    // get methods
    get voiceChannel() {
        return this.guild.me.voiceChannel;
    }

    get connection() {
        return this.voiceChannel ? this.voiceChannel.connection : null;
    }

};