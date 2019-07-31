import { Argument, Possible, KlasaMessage } from "klasa";

export default class extends Argument {

	async run(arg:string, possible:Possible, message:KlasaMessage) {
		// Regular Channel support
		const channel = Argument.regex.channel.test(arg) ? await this.client.channels.fetch(Argument.regex.channel.exec(arg)[1]).catch(() => null) : null;
		if (channel) return channel;
		// DM Channel support
		const user = Argument.regex.userOrMember.test(arg) ? await this.client.users.fetch(Argument.regex.userOrMember.exec(arg)[1]).catch(() => null) : null;
		if (user) return user.createDM();
		throw message.i18n.get("resolver_invalid_channel", { name: possible.name });
	}

};
