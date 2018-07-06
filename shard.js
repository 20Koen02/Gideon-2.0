// loading the .env file with dotenv
require('dotenv').config();

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./index.js', { token: process.env.DISCORD });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Successfully Launched shard ${shard.id} [ ${shard.id + 1} of ${manager.totalShards} ]`));