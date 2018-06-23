require('dotenv').config();
const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
    console.log("Bot is ready!") 
});
client.login(process.env.DISCORD_TOKEN)