import { i18nStrings } from "typings";
import * as MessageFormat from "messageformat";
import { Client } from "discord.js";
import { readJSON } from "fs-nextra";

export class Language {
  private client: Client; 
  lang: string;
  strings: i18nStrings;
  private mf: MessageFormat;
  constructor(client: Client, lang:string, strings:i18nStrings) {
    this.strings = strings;
    this.lang = lang;
    this.client = client;
    this.mf = new MessageFormat(this.lang);
  }


  get(term:string, format?:Record<string, string | number | boolean>) {
    let value = this.strings[term.toLowerCase()];
    if(!value) value = this.client.i18n[this.client.config.defaultLang].strings[term.toLowerCase()];
    if(!value) throw new Error(`Term ${term} does not exists.`);
    if(Array.isArray(value)) return value;
    const output = this.mf.compile(value)(format);
    return output;
  }

  getDefault(term:string, format?:Record<string, string | number | boolean>) {
    const value = this.client.i18n[this.client.config.defaultLang].strings[term.toLowerCase()];
    if(Array.isArray(value)) return value;
    const output = this.mf.compile(value)(format);
    return output;
  }

  async updateStrings() {
    this.strings = {};
    const json = await readJSON(`./langs/${this.lang}.json`) as i18nStrings;
    this.strings = json;
  }
}