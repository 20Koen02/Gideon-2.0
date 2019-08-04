import { i18nStrings } from "typings";
import { readdir, readJSON } from "fs-nextra";
import { Language } from "./Language";
import { Client } from "discord.js";

export class GideonLanguage {
  private client: Client
  constructor(client:Client) {
    this.client = client;
  }

  async loadAll() {
    try {
      const files = await readdir("./langs");
      for await (const file of files) {
        const lang = await readJSON(`./langs/${file}`) as i18nStrings;
        const locale = file.split(".json")[0];
        this.client.i18n[locale] = new Language(this.client, locale, lang);
        this.client.console.log(`[Languages] Loaded ${locale}.`);
      }
    } catch(e) {
      this.client.console.error("Something happened while loading the languages", e)
    }
  }
}