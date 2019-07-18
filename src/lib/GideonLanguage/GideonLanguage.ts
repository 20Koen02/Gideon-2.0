import { GideonClient, i18nStrings } from "typings";
import { readdir, readJSON } from "fs-nextra";
import { Language } from "./Language";

export default class GideonLanguage {
  private bot: GideonClient
  constructor(bot:GideonClient) {
    this.bot = bot;

    this.loadAll();
  }

  async loadAll() {
    try {
      const files = await readdir("./bin/i18n");
      for await (const file of files) {
        const lang = await readJSON(`./bin/i18n/${file}`)
        const locale = file.split(".json")[0];
        this.bot.i18n[locale] = new Language<i18nStrings>(locale, lang);
        this.bot.console.log(`[Languages] Loaded ${locale}.`);
      }
    } catch(e) {
      this.bot.console.error("Something happened while loading the languages", e)
    }
  }
}