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

        this.dispatcher = null;
        this.channel = null;

        this.autoplay = false;
        this.loop = false;
        this.next = null;
        this.status = 'idle';

        this.youtube = youtube;
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
    /**
     * Search for a video
     * @param name The name of the song you are searching
     * @returns {Array[]}
     */
    async search(name) {
        const videos = await youtube.searchVideos(name);
        if (videos.length === 0) return new Error(`No video found for ${name}`);
        const list = [];
        for (let i = 0; i < videos.length; i++) {
            const info = await youtube.getVideoByID(videos[i].id);
            const result = {
                duration: info.durationSeconds,
                title: info.title,
                url: info.url,
                id: info.id
            };
            list.push(result);
        }
        return list;
    }
    async addSong(user, songID) {
        const song = await youtube.getVideoByID(songID);
        const data = {
            url: song.url,
            title: song.title,
            requester: user,
            duration: song.durationSeconds,
            id: song.id
        };
        this.queue.push(data);
        return data;
    }
    async playSong() {
        const song = this.queue[0];
        this.pushPlayed(song.url);
        const stream = ytdl(song.url, {
                audioonly: true
            })
            .on('error', err => this.client.console.log(`Error occurred when streaming video: ${err}`, 'error'));

        this.dispatcher = this.connection.play(stream, {
            passes: 5
        });

        return this.dispatcher;
    }
    pushPlayed(url) {
        this.recentlyPlayed.push(url);
        this.recentlyPlayed.shift();
    }

    skip(force = false) {
        if (force && this.dispatcher) this.dispatcher.end();
        else this.queue.shift();
        return this;
    }


    /**
     * Get video information
     * @param id The id of the video you want info about
     * @returns {Object}
     */
    async getInfo(id) {
        // will add more data here.
        const song = await youtube.getVideoByID(id);
        const data = {
            description: song.description,
            length: song.durationSeconds,
            publishedAt: song.publishedAt,
            image: song.thumbnails.default.url
        };
        return data;
    }

    // get methods
    get voiceChannel() {
        return this.guild.me.voiceChannel;
    }

    get connection() {
        return this.voiceChannel ? this.voiceChannel.connection : null;
    }

};