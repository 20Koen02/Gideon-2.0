import { Possible, KlasaMessage } from "klasa";
import { Argument, Duration } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const date = new Duration(arg).fromNow;
		if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
		throw message.i18n.get("resolver_invalid_duration", { name: possible.name });
	}

};
