import { Client } from "discord.js";
import fetch from "node-fetch";
import { SecretConfig } from "@src/config";
import { readdir, writeFile, readFile, readJSON, createReadStream } from "fs-nextra";;
import { i18nStrings } from "typings";
import { Language } from "./Language";
import * as FormData from "form-data";

const i18nfile = "bot.json";

export class i18nManager {
  private client: Client;
  private lang_names: { [x:string]: string };
  private lang_codes: { [x:string]: string };
  constructor(client:Client) {
    this.client = client;
    this.lang_names = {};
    this.lang_codes = {}
  }

  async updateAll() {
    await Object.keys(this.lang_names).forEach(async l => {
      await this.update(l);
    })
  }

  async update(lang:string) {
    const languageinfo = await this.getLanguageInfo(lang);
    if(languageinfo.files.find(f => f.name == "bot.json").approved == 0) return;
    this.client.console.log(`[Language] Updating ${this.lang_names[lang]} file...`);
    const file = await fetch(`https://api.crowdin.com/api/project/${SecretConfig.crowdin.projectname}/export-file?key=${SecretConfig.crowdin.apiKey}&json&file=${encodeURIComponent(i18nfile)}&language=${lang}`).then(res => res.text());

    await writeFile(`./langs/${lang}.json`, file);
    if(!this.client.i18n[lang]) return this.loadTranslation(`${lang}.json`);
    return this.client.i18n[lang].updateStrings();
  }

  async loadCodes() {
    const codes: Status[] = await fetch(`https://api.crowdin.com/api/project/${SecretConfig.crowdin.projectname}/status?key=${SecretConfig.crowdin.apiKey}&json`).then(res => res.json());
    codes.forEach(l => {
      this.lang_codes[l.name] = l.code;
      this.lang_names[l.code] = l.name;
    });
  }

   async getLanguageInfo(lang:string): Promise<LanguageStatus> {
     return fetch(`https://api.crowdin.com/api/project/${SecretConfig.crowdin.projectname}/language-status?key=${SecretConfig.crowdin.apiKey}&json&language=${lang}`).then(res => res.json());
   }

  async upload() {
    // if(!this.client.options.production) return;
    const formData = new FormData();
    formData.append('key', SecretConfig.crowdin.apiKey);
    formData.append('json', '');
    formData.append("files[bot.json]", createReadStream("./langs/en-US.json"))

    const res = await fetch(`https://api.crowdin.com/api/project/${SecretConfig.crowdin.projectname}/update-file`, { method: "POST", body: formData });
    if(res.ok) this.client.console.log("[Languages] Uploaded the translation file");
  }

  async loadTranslations() {
    try {
      const files = await readdir("./langs");
      for await (const file of files) this.loadTranslation(file);
    } catch(e) {
      this.client.console.error("Something happened while loading the languages", e)
    }
  }

  async loadTranslation(file:string) {
    const lang = await readJSON(`./langs/${file}`) as i18nStrings;
    const locale = file.split(".json")[0];
    if(this.client.i18n[locale]) return;
    const langClass = new Language(this.client, locale, lang);
    this.client.i18n[locale] = langClass;
    this.client.console.log(`[Languages] Loaded ${locale}.`);
  }
}

interface Status {
  name: "string";
  code: string;
  phrases: number;
  translated: number;
  approved: number;
  words: number;
  words_translated: number;
  words_approved: number;
  translated_progress: number;
  approved_progress: number;
  qa_issues: number;
}

interface LanguageStatus {
  files: {
    node_type: string;
    id: string;
    name: string;
    phrases: number;
    translated: number;
    approved: number;
    words: number;
    words_translated: number;
    words_approved: number;
  }[]
}