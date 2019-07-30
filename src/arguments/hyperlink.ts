import { Argument, Possible, KlasaMessage } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";
import { parse } from "url";

@applyOptions<ArgumentOptions>({
	aliases: ["url"]
})

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const res = parse(arg);
		const hyperlink = res.protocol && res.hostname ? arg : null;
		if (hyperlink !== null) return hyperlink;
		throw message.i18n.get("RESOLVER_INVALID_URL", { name: possible.name });
	}

};
