class Event {

  constructor(client, file, options = {}) {
    this.client = client;
    this.name = options.name || file.name;
    this.enabled = "enabled" in options ? options.enabled : true;
    this.file = file;
    this.store = this.client.monitors;
    this.dir = `${process.cwd()}/monitors`;

    /**
     * Whether the monitor ignores bots or not
     * @since 2.0.0
     * @type {boolean}
     */
    this.ignoreBots = options.ignoreBots || true;
  }

  /**
   * The run method to be overwritten in actual monitor pieces
   * @since 2.0.0
   * @param {Message} msg The discord message
   * @returns {void}
   * @abstract
   */
  run() {
    // Defined in extension Classes
    throw new Error(`The run method has not been implemented by ${this.type}:${this.name}.`);
  }

  /**
   * If the monitor should run based on the filter options
   * @since 2.0.0
   * @param {Message} msg The message to check
   * @returns {boolean}
   */
  shouldRun(msg) {
    return this.enabled && !(this.ignoreBots && msg.author.bot) && !(this.ignoreEdits && msg._edits.length);
  }

}

module.exports = Event;