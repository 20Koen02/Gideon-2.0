import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const literal = possible.name.toLowerCase();
		if (typeof arg === "undefined" || arg.toLowerCase() !== literal) message.args.splice(message.params.length, 0, undefined);
		return literal;
	}

};
