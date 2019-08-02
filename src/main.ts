import { token, mongodb } from "./config";
import { GideonDatabase } from "./lib/GideonDatabase/GideonDatabase";
import { GideonLanguage } from "./lib/GideonLanguage/GideonLanguage";
import { GideonAPI } from "./lib/GideonAPI/GideonAPI";
import { BaseCluster } from "kurasuta";

import "./lib/prototypes/GideonGuild";
import "./lib/prototypes/GideonMessage";


export default class extends BaseCluster {
  async launch() {
    this.client.login(token);
    new GideonDatabase(this.client, { url: mongodb.url });
    new GideonLanguage(this.client);
    new GideonAPI(this.client);
  }
}