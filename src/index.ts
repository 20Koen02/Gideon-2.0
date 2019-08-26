import { join, resolve } from "path";
import { Canvas } from "canvas-constructor";
import { ShardingManager } from "kurasuta";
import { KlasaClient } from "klasa";
import { BotConfig, SecretConfig, KlasaConfig } from "./config";

const TSModuleAlias = require("@momothepug/tsmodule-alias");

TSModuleAlias.use({
  "@lib/*": `${__dirname}/lib/*`,
  "@assets/*": "../assets/*",
  "@src/*": `${__dirname}/*`
},);

Canvas.registerFont(resolve(join(__dirname, '../assets/fonts/Ubuntu.ttf')), 'Ubuntu');

import MusicManager from "@lib/GideonMusic/MusicManager";


KlasaClient.use(require("klasa-dashboard-hooks"));
const sharder = new ShardingManager(join(__dirname, "main"), {
  client: class GideonClient extends KlasaClient {
    constructor() {
      super(KlasaConfig);
      this.i18n = {};
      this.config = BotConfig;
      this.music = new MusicManager();
    }
  },
  development: SecretConfig.development,
  token: SecretConfig.token
});
sharder.spawn();