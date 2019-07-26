import * as mongoose from "mongoose";
import { connect as mongoConnect } from "mongoose";
import { GideonClient } from "../../../typings";

export class GideonDatabase {
  private bot: GideonClient;
  constructor(bot:GideonClient, { url } : { url:string }) {
    setTimeout(() => {
      mongoConnect(url, {
        useNewUrlParser: true,
        useFindAndModify: false
      });

      const db = mongoose.connection;
      db.on("error", bot.console.error.bind(console, "Connection error:"));
      db.once("open", () => {
        bot.console.log("[Database] Connected to Database.");
      });

      this.bot = bot;

      this.bot.database = db;
    }, 2000);
  }

}