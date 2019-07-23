import { Document, Model, Connection } from "mongoose";
import { Client } from "discord.js";

export class GideonClient extends Client {
  database?: Connection;
  i18n?: i18n;
}

export interface BotConfig {
  defaultLang: string; 
}

/* Start i18n */
export interface i18n {
  [s: string]: ILanguage<i18nStrings>;
  "en-US"?: ILanguage<i18nStrings>;
  "nl-NL"?: ILanguage<i18nStrings>;
}

export interface ILanguage<LanguageStrings> {
  strings: LanguageStrings;
  lang: string;

  get(term: string, format?: Record<string, string | number | boolean>): string | string[];
  getDefault(term: string, format?: Record<string, string | number | boolean>): string | string[];
}

export interface i18nStrings {
  [s: string]: string | string[];
  weather_language: string;
  valid_city: string;
  flip: string[];
  fortunes: string[];
  max_chars: string;
  min_chars: string;
  ping_fetch: string;
  ping_processing: string;
  urban_defenition: string;
  urban_example: string;
  urban_word_not_found: string;
}

/* End i18n */

/* Start Models */
export interface IGideonGuild extends Document {
  guildid: string;
  language: string;
}

export interface IModel<MongooseModel extends Document> extends Model<MongooseModel> {
  findOrCreate(query:object): Promise<MongooseModel>
}

/* End Models */

declare module "*.json" {
  const value: any;
  export default value;
}

/* Discord.js extentions */
declare module 'discord.js' {
  export interface Guild {
    config: any;
    i18n: ILanguage<i18nStrings>
	}

	export interface Message {
    i18n: ILanguage<i18nStrings>
		translate(key: string, localeArgs?: Record<string, string | number | boolean>, options?: MessageOptions): Promise<Message | Message[]>;
	}

	export interface User {
		config: any;
  }
  
  export interface Client {
    database?: Connection;
    i18n?: i18n;
  }
}
declare module 'klasa' {
  export interface KlasaMessage {
    prompt(text:string, time?:number) : Promise<KlasaMessage>
	}
}