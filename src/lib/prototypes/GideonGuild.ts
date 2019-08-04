import { Structures } from "discord.js";

export default Structures.extend("Guild", Guild => class extends Guild {
  constructor(...args:any[]) {
    super(args[0], args[1]);

    this.config = {
      language: "en-US"
    };

    this.i18n = this.client.i18n[this.config.language];

    this.music = this.client.music.add(this);
  }
});
