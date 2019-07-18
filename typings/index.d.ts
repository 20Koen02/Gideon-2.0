import { Document, Model, Connection } from "mongoose";
import { Client } from "discord.js";

export class GideonClient extends Client {
  database?: Connection;
  i18n?: i18n;
}

export interface i18n {
  [s: string]: any;
  "en-US"?: i18nStrings;
}

export interface i18nStrings {
  hi: string;
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