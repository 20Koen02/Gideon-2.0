import { i18nStrings } from "../../../typings";
import IntlMessageFormat from "intl-messageformat";
import { GideonClient } from "../..";

export class Language {
  private client: GideonClient; 
  lang: string;
  strings: i18nStrings;
  constructor(client: GideonClient, lang:string, strings:i18nStrings) {
    this.strings = strings;
    this.lang = lang;
    this.client = client;
  }

  get(term:string, format?:Record<string, string | number | boolean>) {
    const value = this.strings[term.toLowerCase()];
    if(Array.isArray(value)) return value;
    const output = new IntlMessageFormat(value, this.lang).format(format);
    return output;
  }

  getDefault(term:string, format?:Record<string, string | number | boolean>) {
    const value = this.client.i18n[this.client.config.defaultLang].strings[term.toLowerCase()];
    if(Array.isArray(value)) return value;
    const output = new IntlMessageFormat(value, this.lang).format(format);
    return output;
  }
}