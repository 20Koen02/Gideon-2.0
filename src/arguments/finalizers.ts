import { MultiArgument } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";

@applyOptions<ArgumentOptions>({
	aliases: ["...finalizer"]
})

export default class extends MultiArgument {
	
	get base() {
		return this.store.get("finalizer");
	}

};
