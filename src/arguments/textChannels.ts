import { MultiArgument } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";

@applyOptions<ArgumentOptions>({
	aliases: ["...textChannel"]
})

export default class extends MultiArgument {

	get base() {
		return this.store.get("textChannel");
	}

};
