require("dotenv").config();
require("./util/Prototypes.js");
require("./extenders/Message.js");
require("./extenders/Guild.js");
require("./extenders/DMChannel.js");
require("./extenders/TextChannel.js");
const GideonClient = require("./structures/GideonClient.js");
const errorDirnameRegex = new RegExp(`${__dirname}/`, "g");

const client = new GideonClient({
    disableEveryone: true,
    messageCacheMaxSize: 100,
    messageCacheLifetime: 240,
    messageSweepInterval: 300,
    shardCount: 3
});

client.login(process.env.DISCORD);

client.on("disconnect", () => client.console.warn("Bot is disconnecting..."))
    .on("reconnect", () => client.console.log("Bot reconnecting..."))
    .on("error", err => client.console.error(err))
    .on("warn", info => client.console.warn(info));

process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(errorDirnameRegex, "./");
    client.console.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
});

process.on("unhandledRejection", client.console.error);
