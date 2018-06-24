class Event {

  constructor(client, file, options = {}) {
    this.client = client;
    this.name = options.name || file.name;
    this.enabled = "enabled" in options ? options.enabled : true;
    this.file = file;
    this.store = this.client.languages;
    this.dir = `${process.cwd()}/languages`;
  }

  /**
   * Method to get language string.
   * @since 3.0.0
   * @param {string} term The string or function to look up.
   * @param {...*} args Any argument to pass to the lookup.
   * @returns {string}
   */
  get(term, ...args) {
    if (!this.enabled && this !== this.store.default) return this.store.default.get(term, ...args);
    const value = this.texts[term];
    switch (typeof value) {
      case 'function':
        return value(...args);
      case 'undefined':
        return this.store.default.get(term, ...args);
      default:
        return value;
    }
  }

}

module.exports = Event;
