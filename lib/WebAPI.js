const Polka = require("polka")().constructor;
const moment = require('moment');
require('moment-duration-format');

class WebAPI extends Polka {
    constructor(client, options = {
        port: 3000,
        origin: '*'
    }) {
        super();

        this.client = client;

        this.origin = options.origin;

        this.use(this.setHeaders.bind(this));

        this.get('api/stats', async (request, response) => {
            try {
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
            } catch (err) {
                console.log(`[WebAPI error]: ${err}`);
                response.end(JSON.stringify({
                    error: 'There is some error, please try again later.'
                }));
            }
        });
        this.get('api/commands', (req, res) => {
			try {
				res.end(JSON.stringify(this.client.commands.map(cmd => cmd.toJSON())));
			} catch(err) {
				console.log(`[WebAPI error]: ${err}`);
				res.end(JSON.stringify({
					error: 'There is some error, please try again later.'
				}));
            }
        });
        this.listen(options.port).then(console.log(`Web API started on port: ${options.port}`));

    }
    setHeaders(request, response, next) {
		response.setHeader('Access-Control-Allow-Origin', this.origin);
		response.setHeader('Content-Type', 'application/json');
		next();
	}
	
}
module.exports = WebAPI;