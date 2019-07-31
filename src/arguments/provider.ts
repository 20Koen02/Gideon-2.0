import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const provider = this.client.providers.get(arg);
		if (provider) return provider;
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "provider" });
	}

};
