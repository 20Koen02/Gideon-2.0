import { Structures } from "discord.js";
import { KlasaMessage } from "klasa";

export default Structures.extend("Message", Message => {
  class GideonMessage extends Message {
    constructor(...args:any[]) {
      super(args[0], args[1], args[2]);

      this.i18n = this.guild.i18n;
    }
    translate(key:string, localeArgs?: Record<string, string | number | boolean>) {
      const _string = this.guild.i18n.get(key, localeArgs);
      return this.send(_string);
    }
  }
  return GideonMessage;
});
