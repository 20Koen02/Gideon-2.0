import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const event = this.client.events.get(arg);
		if (event) return event;
		throw message.i18n.get("RESOLVER_INVALID_PIECE", { name: possible.name, piece: "event"});
	}

};
