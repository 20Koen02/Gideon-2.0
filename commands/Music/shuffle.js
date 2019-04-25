const { MusicCommand } = require("../../lib/Music");

module.exports = class extends MusicCommand {
    constructor(...args) {
        super(...args, {
            description: "Shuffles the queue",
            requireMusic: true
        });
    }

    async run(msg) {
        let curr = msg.guild.music.queue[0];
        let shuffleQueue = msg.guild.music.queue;
        shuffleQueue.shift();
        msg.guild.music.queue = shuffle(shuffleQueue);
        msg.guild.music.queue.unshift(curr);
        msg.send("Queue successfully shuffled!");
    }
};

function shuffle(arr) {
    var ctr = arr.length,
        temp,
        index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}
