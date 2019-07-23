import { KlasaClient, KlasaClientOptions } from "klasa";
import { KlasaConfig, token, mongodb, BotConfig } from "./config";
import { GideonDatabase } from "./lib/GideonDatabase/GideonDatabase";
import GideonLanguage from "./lib/GideonLanguage/GideonLanguage";
import { i18n, BotConfig as BC } from "typings";
import "./lib/prototypes/GideonGuild";
import "./lib/prototypes/GideonMessage";


export class GideonClient extends KlasaClient {
  i18n: i18n;
  config: BC;
  constructor(options: KlasaClientOptions) {
    super(options);
    this.i18n = {};
    this.config = BotConfig;
  }
}

const c = new GideonClient(KlasaConfig);
new GideonDatabase(c, { url: mongodb.url });
new GideonLanguage(c);
c.login(token);