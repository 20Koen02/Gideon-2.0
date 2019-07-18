import { KlasaClient, KlasaClientOptions } from "klasa";
import { KlasaConfig, token, mongodb } from "./config";
import { GideonDatabase } from "./lib/GideonDatabase/GideonDatabase";
import GideonLanguage from "./lib/GideonLanguage/GideonLanguage";
import { i18n } from "typings";

export class GideonClient extends KlasaClient {
  i18n: i18n;
  constructor(options: KlasaClientOptions) {
    super(options);
    this.i18n = {};

  }
}

const c = new GideonClient(KlasaConfig);
new GideonDatabase(c, { url: mongodb.url });
new GideonLanguage(c).loadAll();
c.login(token);