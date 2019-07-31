import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	async run(arg:string, possible:Possible, message:KlasaMessage) {
		const member = Argument.regex.userOrMember.test(arg) ? await message.guild.members.fetch(Argument.regex.userOrMember.exec(arg)[1]).catch(() => null) : null;
		if (member) return member;
		throw message.i18n.get("resolver_invalid_member", { name: possible.name });
	}

};
