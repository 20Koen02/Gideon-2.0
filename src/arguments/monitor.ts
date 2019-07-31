import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const monitor = this.client.monitors.get(arg);
		if (monitor) return monitor;
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "monitor" });
	}

};
