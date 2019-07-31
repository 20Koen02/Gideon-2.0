import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { FastifyInstance } from "fastify";
import { readdir } from "fs-nextra";
import { Client } from "discord.js";


export class GideonAPI {
  private client: Client;
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  routes: Array<any>
  constructor(client:Client) {
    this.client = client;
    this.server = fastify();
    this.routes = [];
    
    this.client.apiServer = this.server;

    setTimeout(async () => {
      await this.loadAll();
      await this.server.listen(this.client.config.apiPort, "0.0.0.0", err => {
        if(err) throw err;
        this.client.console.log(`[API] Server listening on ${this.client.config.apiPort}.`);
      });
    }, 2000);
  }

  async loadAll() {
    try {
      const files = await readdir("./bin/routes");
      for await (const file of files) {
        const routename = file.split(".js")[0];
        const route = require(`./bin/routes/${file}`);
        this.routes.push(route);
        // @todo Loading the routes into the server
        this.client.console.log(`[API] Loaded ${routename}.`);
      }
    } catch(e) {
      this.client.console.error("Something happened while loading the api", e)
    }
  }
}
