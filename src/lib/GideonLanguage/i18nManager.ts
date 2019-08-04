import { Client } from "discord.js";
import { GideonLanguage } from "./GideonLanguage";
import fetch from "node-fetch";
import { SecretConfig } from "@src/config";

const i18nfile = "bot.json";

export class i18nManager {
  client: Client;
  lang_names: {[x:string]:string};
  lang_codes: {[x:string]:string};
  constructor(client:Client) {
    this.client = client;
    this.lang_names = {};
    this.lang_codes = {}
  }

  async updateAll() {
    await Object.keys(this.lang_codes).forEach(async l => {
      await this.update(l);
    })
  }

  async update(lang:string, retry = true) {

    this.client.console.log(`Updating ${lang} file...`);
    const file = await fetch(`https://api.crowdin.com/api/project/${SecretConfig.crowdin.projectname}/export-file?key=${SecretConfig.crowdin.apiKey}&json&file=${encodeURIComponent(i18nfile)}&language=${lang}`).then(res => res.text());
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

  async uploadFile() {}

  async upload() {}

  loadTranslations() {
    return new GideonLanguage(this.client);
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