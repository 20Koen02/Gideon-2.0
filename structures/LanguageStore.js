const Store = require("./Store");

class LanguageStore extends Store {

	constructor(client) {
		super(client, "languages");
	}

	/**
	   * Getting language by name.
	   * @since 3.0.0
	   */
	get(name) {
		const [term0, term1] = name.split('-');
		return super.get(`${term0.toLowerCase()}-${term1 ? term1.toUpperCase() : ''}`);
	}

	/**
	 * The default language.
	 * @since 3.0.0
	 * @type {?Language}
	 * @readonly
	 */
	get default() {
		return this.get('en-US') || null;
	}

}

module.exports = LanguageStore;
