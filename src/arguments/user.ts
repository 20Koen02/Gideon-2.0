import { Argument, Possible, KlasaMessage } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { ArgumentOptions } from "klasa";

@applyOptions<ArgumentOptions>({
	aliases: ["...mention"]
})

export default class extends Argument {

	async run(arg:string, possible:Possible, message:KlasaMessage) {
		const user = Argument.regex.userOrMember.test(arg) ? await this.client.users.fetch(Argument.regex.userOrMember.exec(arg)[1]).catch(() => null) : null;
		if (user) return user;
		throw message.i18n.get("resolver_invalid_user", { name: possible.name });
	}

};
