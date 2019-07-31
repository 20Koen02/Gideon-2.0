import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	async run(arg:string, possible:Possible, message:KlasaMessage) {
		const channel = Argument.regex.channel.test(arg) ? await this.client.channels.fetch(Argument.regex.channel.exec(arg)[1]).catch(() => null) : null;
		if (channel && channel.type === "text") return channel;
		throw message.i18n.get("resolver_invalid_channel", { name: possible.name });
	}

};
