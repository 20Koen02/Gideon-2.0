import { Argument, Possible, KlasaMessage } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";

@applyOptions<ArgumentOptions>({
	aliases: ["msg"]
})

export default class extends Argument {


	async run(arg:string, possible:Possible, message:KlasaMessage) {
		const msg = Argument.regex.snowflake.test(arg) ? await message.channel.messages.fetch(arg).catch(() => null) : undefined;
		if (msg) return msg;
		throw message.i18n.get("resolver_invalid_message", { name: possible.name });
	}

};
