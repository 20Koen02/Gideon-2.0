import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	async run(arg:string, possible:Possible, message:KlasaMessage) {
		const user = Argument.regex.userOrMember.test(arg) ? await this.client.users.fetch(Argument.regex.userOrMember.exec(arg)[1]).catch(() => null) : null;
		if (user) return user.createDM();
		throw message.i18n.get("RESOLVER_INVALID_CHANNEL", { name: possible.name });
	}

};
