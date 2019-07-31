import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const role = Argument.regex.role.test(arg) ? message.guild.roles.get(Argument.regex.role.exec(arg)[1]) : null;
		if (role) return role;
		throw message.i18n.get("resolver_invalid_role", { name: possible.name });
	}

};
