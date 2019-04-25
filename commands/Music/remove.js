const { MusicCommand } = require("../../lib/Music");

module.exports = class extends MusicCommand {
    constructor(...args) {
        super(...args, {
            usage: "<number:integer>",
            description: "Remove a song from the queue list.",
            requireMusic: true
        });
    }

    async run(msg, [number]) {
        if (number <= 1) throw "Not a valid song in the queue";
        number--;

        const { music } = msg.guild;
        if (music.queue.length <= number) throw `Not a valid song in the queue`;

        const song = music.queue[number];
        if (song.requester.id !== msg.author.id)
            if (!(await msg.hasAtLeastPermissionLevel(5))) throw DENIED_SONG_REMOVAL;

        music.queue.splice(number, 1);
        return msg.sendMessage(`🗑 Removed the song **${song.title}** requested by **${song.requester}**.`);
    }
};

// The next line is too long to fit above
const DENIED_SONG_REMOVAL = [
    "I find it a bit rude to remove somebody else's songs from the list... Talk with them kindly, or",
    "shout at a DJ if there is one in this guild, if it ruins the party, then they may consider to remove it!"
].join(" ");
