import * as fastify from "fastify";
import { GideonClient } from "../..";
import { Server, IncomingMessage, ServerResponse } from "http";
import { FastifyInstance } from "fastify";
import { readdir } from "fs-nextra";


export class GideonAPI {
  private client: GideonClient;
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  routes: Array<any>
  constructor(client:GideonClient) {
    this.client = client;
    this.server = fastify();
    this.routes = [];

    setTimeout(() => {
      this.loadAll();
    }, 2000);

    // @todo Listen server on port given in config
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
