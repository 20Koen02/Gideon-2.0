import { Argument, Possible, KlasaMessage } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";

@applyOptions<ArgumentOptions>({
	aliases: ["cmd"]
})

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const command = this.client.commands.get(arg.toLowerCase());
		if (command) return command;
		throw message.i18n.get("RESOLVER_INVALID_PIECE", { name: possible.name, piece: "command" });
	}

};
