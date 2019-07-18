import { GideonClient } from "typings";
import { readdir, readJSON } from "fs-nextra";

export default class GideonLanguage {
  private bot: GideonClient
  constructor(bot:GideonClient) {
    this.bot = bot;
  }

  async loadAll() {
    try {
      const files = await readdir("./bin/i18n");
      for await (const file of files) {
        const lang = await readJSON(`./bin/i18n/${file}`)
        const locale = file.split(".json")[0];
        this.bot.i18n[locale] = lang;
        this.bot.console.log(`[Languages] Loaded ${locale}.`)
      }
    } catch(e) {
      this.bot.console.error("Something happened while loading the languages", e)
    }
  }
}