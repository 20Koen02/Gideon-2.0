import { i18nStrings } from "../../../typings";
import { readdir, readJSON } from "fs-nextra";
import { Language } from "./Language";
import { GideonClient } from "../..";

export class GideonLanguage {
  private client: GideonClient
  constructor(client:GideonClient) {
    this.client = client;

    setTimeout(() => {
      this.loadAll();
    }, 2000);
  }

  async loadAll() {
    try {
      const files = await readdir("./bin/i18n");
      for await (const file of files) {
        const lang = await readJSON(`./bin/i18n/${file}`) as i18nStrings;
        const locale = file.split(".json")[0];
        this.client.i18n[locale] = new Language(this.client, locale, lang);
        this.client.console.log(`[Languages] Loaded ${locale}.`);
      }
    } catch(e) {
      this.client.console.error("Something happened while loading the languages", e)
    }
  }
}