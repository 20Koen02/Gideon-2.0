const { resolve } = require('path');
const fs = require('fs-nextra');

module.exports = class JsonProvider {

	constructor(client) {
		Object.defineProperty(this, 'client', { value: client });

		this.baseDir = `${process.cwd()}/data/settings`;
	}

	hasTable(table) {
		return fs.pathExists(resolve(this.baseDir, table));
	}

	createTable(table) {
		return fs.mkdir(resolve(this.baseDir, table));
	}

	deleteTable(table) {
		return this.hasTable(table)
			.then(exists => exists ? fs.emptyDir(resolve(this.baseDir, table)).then(() => fs.remove(resolve(this.baseDir, table))) : null);
	}

	/* Document methods */

	async getAll(table, nice = false) {
		const dir = resolve(this.baseDir, table);
		const files = await fs.readdir(dir);

		if (nice) {
			const documents = [];
			for (let i = 0; i < files.length; i++) {
				if (files[i].endsWith('.json')) await fs.readJSON(resolve(dir, files[i])).then(documents.push);
			}
			return documents;
		} else {
			return Promise.all(files.filter(file => file.endsWith('.json')).map(file => fs.readJSON(resolve(dir, file))));
		}
	}

	async getKeys(table) {
		const dir = resolve(this.baseDir, table);
		const filenames = await fs.readdir(dir);
		const files = [];
		for (let i = 0; i < filenames.length; i++) {
			const filename = filenames[i];
			if (filename.endsWith('.json')) files.push(filename.slice(0, filename.length - 5));
		}
		return files;
	}

	get(table, document) {
		return fs.readJSON(resolve(this.baseDir, table, `${document}.json`)).catch(() => null);
	}

	has(table, document) {
		return fs.pathExists(resolve(this.baseDir, table, `${document}.json`));
	}

	/**
	 * Update or insert a new value to all entries.
	 * @param {string} table The name of the directory
	 * @param {string} path The key's path to update
	 * @param {*} newValue The new value for the key
	 * @param {boolean} [nice=false] Whether the provider should update all entries at the same time or politely update them sequentially
	 */
	async updateValue(table, path, newValue, nice = false) {
		const route = path.split('.');
		if (nice) {
			const values = await this.getAll(table, true);
			for (let i = 0; i < values.length; i++) await this._updateValue(table, route, values[i], newValue);
		} else {
			const values = await this.getAll(table);
			await Promise.all(values.map(object => this._updateValue(table, route, object, newValue)));
		}
	}

	/**
	 * Remove a value or object from all entries.
	 * @param {string} table The name of the directory
	 * @param {string} [path=false] The key's path to update
	 * @param {boolean} nice Whether the provider should update all entries at the same time or politely update them sequentially
	 */
	async removeValue(table, path, nice = false) {
		const route = path.split('.');
		if (nice) {
			const values = await this.getAll(table, true);
			for (let i = 0; i < values.length; i++) await this._removeValue(table, route, values[i]);
		} else {
			const values = await this.getAll(table);
			await Promise.all(values.map(object => this._removeValue(table, route, object)));
		}
	}

	/**
	 * Insert a new document into a directory.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @param {Object} data The object with all properties you want to insert into the document
	 * @returns {Promise<void>}
	 */
	create(table, document, data) {
		return fs.outputJSONAtomic(resolve(this.baseDir, table, `${document}.json`), data);
	}

	set(...args) {
		return this.create(...args);
	}

	insert(...args) {
		return this.create(...args);
	}

	/**
	 * Update a document from a directory.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @param {Object} data The object with all the properties you want to update
	 * @returns {Promise<void>}
	 */
	async update(table, document, data) {
		const existent = await this.get(table, document); // eslint-disable-line no-unused-vars
		return fs.outputJSONAtomic(resolve(this.baseDir, table, `${document}.json`), data);
	}

	/**
	 * Replace all the data from a document.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @param {Object} data The new data for the document
	 * @returns {Promise<void>}
	 */
	replace(table, document, data) {
		return fs.outputJSONAtomic(resolve(this.baseDir, table, `${document}.json`), data);
	}

	/**
	 * Delete a document from the table.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @returns {Promise<void>}
	 */
	delete(table, document) {
		return fs.unlink(resolve(this.baseDir, table, `${document}.json`));
	}

	/**
	 * Update or insert a new value to a specified entry.
	 * @param {string} table The name of the directory
	 * @param {string[]} route An array with the path to update
	 * @param {Object} object The entry to update
	 * @param {*} newValue The new value for the key
	 * @returns {Promise<void>}
	 * @private
	 */
	_updateValue(table, route, object, newValue) {
		let value = object;
		for (let j = 0; j < route.length - 1; j++) {
			if (typeof value[route[j]] === 'undefined') value[route[j]] = { [route[j + 1]]: {} };
			value = value[route[j]];
		}
		value[route[route.length - 1]] = newValue;
		return this.replace(table, object.id, object);
	}

	/**
	 * Remove a value from a specified entry.
	 * @param {string} table The name of the directory
	 * @param {string[]} route An array with the path to update
	 * @param {Object} object The entry to update
	 * @returns {Promise<void>}
	 * @private
	 */
	_removeValue(table, route, object) {
		let value = object;
		for (let j = 0; j < route.length - 1; j++) value = value[route[j]] || {};
		delete value[route[route.length - 1]];
		return this.replace(table, object.id, object);
	}

};