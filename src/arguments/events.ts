import { MultiArgument } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";

@applyOptions<ArgumentOptions>({
	aliases: ["...event"]
})

export default class extends MultiArgument {

	get base() {
		return this.store.get("event");
	}

};
