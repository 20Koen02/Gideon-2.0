import * as mongoose from "mongoose";
import { connect as mongoConnect } from "mongoose";
import { Client } from "discord.js";

export class GideonDatabase {
  private client: Client;
  constructor(client:Client, { url } : { url:string }) {
    setTimeout(() => {
      mongoConnect(url, {
        useNewUrlParser: true,
        useFindAndModify: false
      });

      const db = mongoose.connection;
      db.on("error", (err) => client.console.error(`Connection error: ${err}`));
      db.once("open", () => {
        client.console.log("[Database] Connected to Database.");
      });

      this.client = client;

      this.client.database = db;
    }, 2000);
  }

}