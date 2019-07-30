import { Inhibitor, KlasaMessage, Command } from "klasa";
import { TextChannel } from "discord.js";

export default class CooldownInhibitor extends Inhibitor {
  run(message:KlasaMessage, command:Command) {
		if (command.nsfw && !(message.channel as TextChannel).nsfw) throw message.i18n.get('inhibitor_nsfw');
	}
}