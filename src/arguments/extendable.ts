import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const extendable = this.client.extendables.get(arg);
		if (extendable) return extendable;
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "extendable" });
	}

};
