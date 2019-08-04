import { join, resolve } from "path";
import { Canvas } from "canvas-constructor";
import { ShardingManager } from "kurasuta";
import { KlasaClient } from "klasa";
import { i18n, BotConfig as BC } from "typings";
import { BotConfig, token, KlasaConfig } from "./config";
import { PlayerManager } from "discord.js-lavalink";

const TSModuleAlias = require("@momothepug/tsmodule-alias");

TSModuleAlias.use({
  "@lib/*": `${__dirname}/lib/*`,
  "@assets/*": "../assets/*",
  "@src/*": `${__dirname}/*`
},);

Canvas.registerFont(resolve(join(__dirname, '../assets/fonts/Ubuntu.ttf')), 'Ubuntu');

import MusicManager from "@lib/GideonMusic/MusicManager";

const sharder = new ShardingManager(join(__dirname, "main"), {
  client: class GideonClient extends KlasaClient {
    constructor() {
      super(KlasaConfig);
      this.i18n = {};
      this.config = BotConfig;
      this.music = new MusicManager();
    }
  },
  development: true,
  token: token
});
sharder.spawn();