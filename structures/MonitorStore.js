const Store = require("./Store");

class MonitorStore extends Store {

	constructor(client) {
		super(client, "monitors");
	}
	/**
	 * Runs our monitors on the message.
	 * @since 2.0.0
	 * @param {Message} msg The message object from Discord.js
	 */
	run(msg) {
		for (const monitor of this.values())
			if (monitor.shouldRun(msg)) this._run(msg, monitor);
	}

	/**
	 * Run a monitor and catch any uncaught promises
	 * @since 2.0.0
	 * @param {Message} msg The message object from Discord.js
	 * @param {Monitor} monitor The monitor to run
	 * @private
	 */
	async _run(msg, monitor) {
		try {
			await monitor.run(msg);
		} catch (err) {
			this.client.emit('monitorError', monitor, msg, err);
		}
	}
}

module.exports = MonitorStore;