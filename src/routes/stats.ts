import { applyOptions } from "@lib/Util/Util";
import { RouteOptions, Route } from "klasa-dashboard-hooks";
import { ServerResponse, IncomingMessage } from "http";


@applyOptions<RouteOptions>({
  route: "stats"
})

export default class extends Route {

  async get(request:IncomingMessage, response:ServerResponse) {
    let [users, guilds, channels, memory] = [0, 0, 0, 0];
    const results = await this.client.shard.broadcastEval(`[this.users.size, this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`);
    for (const result of results) {
        users += result[0];
        guilds += result[1];
        channels += result[2];
        memory += result[3];
    }
    response.end(JSON.stringify({
        users: users,
        guilds: guilds,
        channels: channels,
        shards: this.client.options.shardCount,
        memory: memory.toFixed(2),
        invite: this.client.generateInvite(),
        avatar: this.client.user.displayAvatarURL({
            format: 'png',
            size: 512
        })
      }));
  }
};
