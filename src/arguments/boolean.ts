import { Argument, Possible, KlasaMessage, ArgumentOptions } from "klasa";
import { applyOptions } from "@lib/Util/Util";
const truths = ["1", "true", "+", "t", "yes", "y"];
const falses = ["0", "false", "-", "f", "no", "n"];

@applyOptions<ArgumentOptions>({
	aliases: ["bool"]
})

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const boolean = String(arg).toLowerCase();
		if (truths.includes(boolean)) return true;
		if (falses.includes(boolean)) return false;
		throw message.i18n.get("resolver_invalid_bool", { name: possible.name });
	}

};
