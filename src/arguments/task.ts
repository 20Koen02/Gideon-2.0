import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	run(arg:string, possible:Possible, message:KlasaMessage) {
		const task = this.client.tasks.get(arg);
		if (task) return task;
		throw message.i18n.get("resolver_invalid_piece", { name: possible.name, piece: "task" });
	}

};
