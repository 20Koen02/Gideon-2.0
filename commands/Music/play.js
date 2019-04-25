const {
    MusicCommand,
    klasaUtil: { sleep }
} = require("../../lib/Music");
const { Command } = require("klasa");
const {
    Permissions: { FLAGS }
} = require("discord.js");

const {
    keys: { yt }
} = require("../../config");
const fetch = require("node-fetch");
const qs = require("querystring");

const URL = "https://www.googleapis.com/youtube/v3/search?";

class PlayCommand extends Command {
    constructor(...args) {
        super(...args, {
            description: "Adds a song the the queue.",
            usage: "<url:string>"
        });
    }

    async run(msg, [url]) {
        const youtubeURL = await this.getURL(url);
        if (!youtubeURL) throw "Not found.";
        const { music } = msg.guild;

        if (!music.voiceChannel) {
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel) throw "You are not connected in a voice channel.";
            this.resolvePermissions(msg, voiceChannel);
            await msg.guild.music.join(voiceChannel);
            msg.sendMessage(`Successfully joined the voice channel ${voiceChannel}`);
        }

        if (!music.queue.length) {
            music.channel = msg.channel;
            const song = await music.add(msg.author, youtubeURL, url);
            msg.sendMessage(`Added **${song.title}** to the queue 🎶`);
            return this.play(music);
        }
        const song = await music.add(msg.author, youtubeURL, url);

        return msg.sendMessage(`Added **${song.title}** to the queue 🎶`);
    }

    async getURL(url) {
        const id = MusicCommand.YOUTUBE_REGEXP.exec(url);
        if (id) return `https://youtu.be/${id[1]}`;

        const query = qs.stringify({
            part: "snippet",
            q: url,
            key: yt
        });
        const { items } = await fetch(URL + query).then(result => result.json());

        const video = items.find(item => item.id.kind === "youtube#video");
        return video ? `https://youtu.be/${video.id.videoId}` : null;
    }

    resolvePermissions(msg, voiceChannel) {
        if (voiceChannel.full) throw "I cannot join your voice channel, it's full!";
        if (msg.guild.music.playing) {
            const botVoiceChannel = msg.guild.music.voice.channel;
            if (voiceChannel.id === botVoiceChannel.id) throw "Already playing!";
            throw "I am sorry, but I am already playing music in another channel!";
        }
        const permissions = voiceChannel.permissionsFor(msg.guild.me);
        if (!permissions.has(FLAGS.CONNECT)) throw "I am missing the CONNECT permission.";
        if (!permissions.has(FLAGS.SPEAK)) throw "I am missing the SPEAK permission.";
    }

    async play(music) {
        while (music.queue.length) {
            const [song] = music.queue;
            await music.channel.send(`🎧 Playing: **${song.title}** as requested by: **${song.requester}**`);
            await sleep(300);

            try {
                if (
                    !(await new Promise(async resolve => {
                        (await music.play())
                            .on("end", () => {
                                music.skip(false);
                                resolve(true);
                            })
                            .on("error", err => {
                                music.channel.send("Error playing the music");
                                music.client.emit("error", err);
                                music.skip();
                                resolve(true);
                            })
                            .once("disconnect", () => {
                                resolve(false);
                            });
                    }))
                )
                    return;
            } catch (error) {
                this.client.emit("error", error);
                music.channel.send(error);
                music.leave();
                break;
            }
        }

        if (!music.queue.length) {
            music.channel.send("There is no music left in the queue!").then(() => music.leave());
        }
    }
}

module.exports = PlayCommand;
