import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const emoji = Argument.regex.emoji.test(arg) ? this.client.emojis.get(Argument.regex.emoji.exec(arg)[1]) : null;
		if (emoji) return emoji;
		throw message.i18n.get("RESOLVER_INVALID_EMOJI", { name: possible.name });
	}

};
