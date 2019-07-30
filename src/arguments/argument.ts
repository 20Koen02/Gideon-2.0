import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const argument = this.client.arguments.get(arg);
		if (argument) return argument;
		throw message.i18n.get("RESOLVER_INVALID_PIECE", { name: possible.name, piece: "argument" });
	}

};
