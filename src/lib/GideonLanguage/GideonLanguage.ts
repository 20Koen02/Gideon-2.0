import { i18nStrings } from "../../../typings";
import { readdir, readJSON } from "fs-nextra";
import { Language } from "./Language";
import { GideonClient } from "../..";

export class GideonLanguage {
  private bot: GideonClient
  constructor(bot:GideonClient) {
    this.bot = bot;

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
        this.bot.i18n[locale] = new Language(this.bot, locale, lang);
        this.bot.console.log(`[Languages] Loaded ${locale}.`);
      }
    } catch(e) {
      this.bot.console.error("Something happened while loading the languages", e)
    }
  }
}