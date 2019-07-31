import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		for (const store of this.client.pieceStores.values()) {
			const piece = store.get(arg);
			if (piece) return piece;
		}
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "piece" });
	}

};
