import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const language = this.client.languages.get(arg);
		if (language) return language;
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "language" });
	}

};
