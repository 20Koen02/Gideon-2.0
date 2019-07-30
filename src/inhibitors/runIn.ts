import { Inhibitor, KlasaMessage, Command } from "klasa";

export default class CooldownInhibitor extends Inhibitor {
  run(message:KlasaMessage, command:Command) {
		if (!command.runIn.length) throw message.i18n.get('inhibitor_runin_none', { name: command.name });
		if (!command.runIn.includes(message.channel.type)) throw message.i18n.get('inhibitor_runin', { types: command.runIn.join(', ') });
	}
}