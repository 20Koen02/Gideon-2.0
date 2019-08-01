import { Inhibitor } from "klasa";
import { applyOptions } from "@lib/Util/Util";
import { InhibitorOptions } from "klasa";
import { KlasaMessage, Command } from "klasa";

@applyOptions<InhibitorOptions>({
  spamProtection: true
})

export default class CooldownInhibitor extends Inhibitor {
  run(message:KlasaMessage, command:Command) {
		if (this.client.owners.has(message.author) || command.cooldown <= 0) return;

    // @ts-ignore
		const existing = command.cooldowns.get(message.levelID);

		if (existing && existing.limited) throw message.i18n.get('inhibitor_cooldown', { remaining: Math.ceil(existing.remainingTime / 1000)});
	}
}