import { Message } from "discord.js";
import Song from "@lib/GideonMusic/Song";
import { Embed } from "@lib/Embed";

export class GideonEmbedManager {
  static music() {
    return new GideonMusicEmbed(); 
  }
}

class GideonMusicEmbed {
  loadedInqueueEmbed(message:Message, song:Song, queue:Song[]) {
    return Embed(message, {})
      .setTitle("🗒 | Song Queued")
      .setTimestamp()
      .addField("Author", song ? song.author : "No Name", true)
      .addField("Time", song ? song.friendlyDuration : "N/A", true)
      .addField("Position in queue", queue.findIndex(s => s.track === song.track) + 1, true)
      .addField("Requested By", song.requester, true)
      .setDescription(`[**${song ? song.title : "No Name"}**](${song.url})`);
  }

  nowPlayingEmbed(message:Message, song:Song) {
    return Embed(message, {})
      .setTitle("⏯ | Now Playing")
      .setTimestamp()
      .setDescription(`
        • **Title:** ${song.title}
        • **Author:** ${song.author}
        • **Duration:** ${song.friendlyDuration}
        • **Requested By:** ${song.requester}
        • **Link:** ${song.url}`);
  }

  queueEmbed(message:Message, queue:Song[]) {
    const queueList = [];
		for (let i = 0; i < Math.min(queue.length, 10); i++) {
			const song = queue[i];
			queueList.push([
				`**${String(i + 1).padStart(2)}.** **${song.title.replace(/\*/g, '\\*')}** request by **${song.requester.tag || song.requester}**`,
				`   └── <${song.url}> (${song.friendlyDuration})`
			].join('\n'));
    }
    if (queue.length > 10) queueList.push("", `Showing 10 songs of ${queue.length} on top of the queue.`);
    return Embed(message, {})
      .setTitle("Music Queue")
      .setDescription(queueList.join("\n"));
  }
}