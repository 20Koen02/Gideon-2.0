import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const guild = Argument.regex.snowflake.test(arg) ? this.client.guilds.get(arg) : null;
		if (guild) return guild;
		throw message.i18n.get("resolver_invalid_guild", { name: possible.name });
	}

};
