import { Inhibitor, KlasaMessage, Command } from "klasa";

export default class CooldownInhibitor extends Inhibitor {
  run(message:KlasaMessage, command:Command) {
		if (!command.enabled) throw message.i18n.get('inhibitor_disabled');
	}
}