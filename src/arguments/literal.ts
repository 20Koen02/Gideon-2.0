import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		if (arg.toLowerCase() === possible.name.toLowerCase()) return possible.name;
		throw message.i18n.get("resolver_invalid_literal", { name: possible.name });
	}

};
