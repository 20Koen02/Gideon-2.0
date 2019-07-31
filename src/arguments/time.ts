import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	get date() {
		return this.store.get("date");
	}

	get duration() {
		return this.store.get("duration");
	}

	run(arg:string, possible:Possible, message:KlasaMessage) {
		let date: Date;
		try {
			date = this.date.run(arg, possible, message);
		} catch (err) {
			try {
				date = this.duration.run(arg, possible, message);
			} catch (error) {
				// noop
			}
		}
		if (date && !isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
		throw message.i18n.get("resolver_invalid_time", { name: possible.name });
	}

};
