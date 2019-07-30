import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const finalizer = this.client.finalizers.get(arg);
		if (finalizer) return finalizer;
		throw message.i18n.get("RESOLVER_INVALID_PIECE", { name: possible.name, piece: "finalizer" });
	}

};
