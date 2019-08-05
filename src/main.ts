import { SecretConfig } from "./config";
import { GideonDatabase } from "./lib/GideonDatabase/GideonDatabase";
import { i18nManager } from "@lib/GideonLanguage/i18nManager";
import { GideonAPI } from "./lib/GideonAPI/GideonAPI";
import { BaseCluster } from "kurasuta";

import "@lib/prototypes/GideonGuild";
import "@lib/prototypes/GideonMessage";


export default class extends BaseCluster {
  async launch() {
    this.client.login(SecretConfig.token);
    new GideonDatabase(this.client, { url: SecretConfig.mongodb.url });
    this.client.i18nmanager = new i18nManager(this.client);
    new GideonAPI(this.client);
    

    await this.client.i18nmanager.loadCodes();
    await this.client.i18nmanager.updateAll();
    await this.client.i18nmanager.loadTranslations();
  }
}