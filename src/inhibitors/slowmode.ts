import { Inhibitor, KlasaMessage, RateLimitManager, InhibitorOptions } from "klasa";
import { applyOptions } from "../lib/Util/Util";

@applyOptions<InhibitorOptions>({
  spamProtection: true
})

export default class CooldownInhibitor extends Inhibitor {
  slowmode: RateLimitManager<string>;
  aggressive: boolean;
  run(message:KlasaMessage) {
    if (this.client.owners.has(message.author)) return;

		const rateLimit = this.slowmode.acquire(message.author.id);

		try {
			rateLimit.drip();
		} catch (err) {
			if (this.aggressive) rateLimit.resetTime();
			throw true;
		}
  }
  
  async init() {
    this.slowmode = new RateLimitManager(1, this.client.options.slowmode);
		this.aggressive = this.client.options.slowmodeAggressive;

		if (!this.client.options.slowmode) this.disable();
  }
}