import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const inhibitor = this.client.inhibitors.get(arg);
		if (inhibitor) return inhibitor;
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "inhibitor" });
	}

};
