import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const store = this.client.pieceStores.get(arg);
		if (store) return store;
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "store" });
	}

};
