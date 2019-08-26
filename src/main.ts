import { SecretConfig } from "./config";
import { GideonDatabase } from "./lib/GideonDatabase/GideonDatabase";
import { i18nManager } from "@lib/GideonLanguage/i18nManager";
import { BaseCluster } from "kurasuta";

import "@lib/prototypes/GideonGuild";
import "@lib/prototypes/GideonMessage";
import "@lib/GideonCommand/GideonCommand";


export default class extends BaseCluster {
  async launch() {
    this.client.login(SecretConfig.token);

    if(SecretConfig.development) this.client.on("debug", (info) => console.log(info));
    new GideonDatabase(this.client, { url: SecretConfig.mongodb.url });
    this.client.i18nmanager = new i18nManager(this.client);
    
    if(SecretConfig.crowdin.enabled) {
      await this.client.i18nmanager.loadCodes();
      await this.client.i18nmanager.updateAll();
      await this.client.i18nmanager.upload();
    }
    await this.client.i18nmanager.loadTranslations();
  }
}