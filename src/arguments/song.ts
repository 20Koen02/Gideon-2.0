import { Argument, Possible, KlasaMessage } from "klasa";
const wildcard = /(?:scsearch:|ytsearch:).*/i;

export default class extends Argument {

  async run(arg: string, possible: Possible, message: KlasaMessage) {
    return message.guild.music.loader.search(message, arg);
  }

};