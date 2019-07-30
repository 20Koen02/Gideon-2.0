import { MultiArgument, ArgumentOptions } from "klasa";
import { applyOptions } from "../lib/Util/Util";

@applyOptions<ArgumentOptions>({
	aliases: ["...argument"]
})

export default class extends MultiArgument {

	get base() {
		return this.store.get("argument");
	}

};
