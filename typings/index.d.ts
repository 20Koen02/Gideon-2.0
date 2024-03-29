import { Document, Model, Connection } from "mongoose";
import { Client } from "discord.js";
import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { PlayerManager } from "discord.js-lavalink";
import MusicManager from "@lib/GideonMusic/MusicManager";
import Music from "@lib/GideonMusic/Music";
import { KlasaMessage } from "klasa";
import { i18nManager } from "@lib/GideonLanguage/i18nManager";

export interface BotConfig {
  defaultLang: string;
  OpenWeatherMap: string;
  apiPort: number
}

/* Start i18n */
export interface i18n {
  [s: string]: ILanguage<i18nStrings>;
}

export interface ILanguage<LanguageStrings> {
  strings: LanguageStrings;
  lang: string;

  get(term: string, format?: Record<string, string | number | boolean>): string | string[];
  getDefault(term: string, format?: Record<string, string | number | boolean>): string | string[];
  updateStrings(): Promise<void>;
}

export interface i18nStrings {
  [s: string]: string | string[];
}

/* End i18n */

/* Start Models */
export interface IGideonGuild extends Document {
  guildid: string;
  language: string;
  dist_measure: string;
  temp_measure: string;
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
    i18n: ILanguage<i18nStrings>;
    music: Music;
	}

	export interface Message {
    i18n: ILanguage<i18nStrings>
		translate(key: string, localeArgs?: Record<string, string | number | boolean>, options?: MessageOptions): Promise<KlasaMessage | KlasaMessage[]>;
	}

	export interface User {
		config: any;
  }
  
  export interface Client {
    database?: Connection;
    i18n?: i18n;
    config: BotConfig;
    apiServer?: FastifyInstance<Server, IncomingMessage, ServerResponse>;
    player?: PlayerManager;
    music: MusicManager;
    i18nmanager: i18nManager;
  }
}
declare module 'klasa' {
  export interface KlasaMessage {
    prompt(text:string, time?:number) : Promise<KlasaMessage>
  }

  export interface CommandOptions {
    desc?: ((i18n: ILanguage<i18nStrings>) => string|string[]);
  }

  export interface Command {
    desc(lang: ILanguage<i18nStrings>): string
  }
}