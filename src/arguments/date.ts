import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const date = new Date(arg);
		if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
		throw message.i18n.get("RESOLVER_INVALID_DATE", { name: possible.name });
	}

};
