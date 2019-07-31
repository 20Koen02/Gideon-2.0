import { Argument, Possible, KlasaMessage } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";

@applyOptions<ArgumentOptions>({
	aliases: ["reg, regex"]
})

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const results = possible.regex.exec(arg);
		if (results !== null) return results;
		throw message.i18n.get("resolver_invalid_regex_match", {name: possible.name, pattern: possible.regex.toString() });
	}

};
