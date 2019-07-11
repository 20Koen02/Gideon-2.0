import { KlasaClient, KlasaClientOptions } from "klasa";
import { KlasaConfig, token } from "./config";

export class GideonClient extends KlasaClient {
  constructor(options: KlasaClientOptions) {
    super(options);

  }
}

new GideonClient(KlasaConfig).login(token);

