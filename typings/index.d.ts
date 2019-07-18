import { Document, Model, Connection } from "mongoose";
import { Client } from "discord.js";

export class GideonClient extends Client {
  database?: Connection;
  i18n?: i18n;
}

export interface i18n {
  [s: string]: any;
  "en-US"?: ILanguage<i18nStrings>;
}

export interface ILanguage<LanguageStrings> {
  strings: LanguageStrings;
  lang: string;
}

export interface i18nStrings {
  weather_language: string;
  valid_city: string;
  fortunes: FortuneStrings;
  max_chars: string;
  min_chars: string;
  ping_fetch: string;
  ping_processing: string;
  urban_defenition: string;
  urban_example: string;
  urban_word_not_found: string;
}

export interface IGideonGuild extends Document {
  guildid: string;
}

export interface IModel<MongooseModel extends Document> extends Model<MongooseModel> {
  findOrCreate(query:object): Promise<MongooseModel>
}

declare module "*.json" {
  const value: any;
  export default value;
}

export interface FortuneStrings {
  0:"🎱 **⇾** ✅ It is certain.",
  1:"🎱 **⇾** ✅ It is decidedly so.",
  2:"🎱 **⇾** ✅ Without a doubt.",
  3:"🎱 **⇾** ✅ Yes - definitely.",
  4:"🎱 **⇾** ✅ You may rely on it.",
  5:"🎱 **⇾** ✅ As I see it, yes.",
  6:"🎱 **⇾** ✅ Most likely.",
  7:"🎱 **⇾** ✅ Outlook good.",
  8:"🎱 **⇾** ✅ Yes.",
  9:"🎱 **⇾** ✅ Signs point to yes.",
  10:"🎱 **⇾** ❓ Reply hazy try again.",
  11:"🎱 **⇾** ❓ Ask again later.",
  12:"🎱 **⇾** ❓ Better not tell you now.",
  13:"🎱 **⇾** ❓ Cannot predict now.",
  14:"🎱 **⇾** ❓ Concentrate and ask again.",
  15:"🎱 **⇾** ❌ Don't count on it.",
  16:"🎱 **⇾** ❌ My reply is no.",
  17:"🎱 **⇾** ❌ My sources say no.",
  18:"🎱 **⇾** ❌ Outlook not so good.",
  19:"🎱 **⇾** ❌ Very doubtful."
}