import { KlasaClient, KlasaClientOptions } from "klasa";
import { KlasaConfig, token, mongodb, BotConfig } from "./config";
import { GideonDatabase } from "./lib/GideonDatabase/GideonDatabase";
import { GideonLanguage } from "./lib/GideonLanguage/GideonLanguage";
import { i18n, BotConfig as BC } from "../typings";
import { Canvas } from "canvas-constructor";
import { join, resolve } from "path";


import "./lib/prototypes/GideonGuild";
import "./lib/prototypes/GideonMessage";


export class GideonClient extends KlasaClient {
  i18n?: i18n;
  config: BC;
  database?: any;
  constructor(options: KlasaClientOptions) {
    super(options);
    this.i18n = {};
    this.config = BotConfig;
  }
}

const client = new GideonClient(KlasaConfig);
new GideonDatabase(client, { url: mongodb.url });
new GideonLanguage(client);
client.login(token);

Canvas.registerFont(resolve(join(__dirname, '../assets/fonts/Ubuntu.ttf')), 'Ubuntu');