const { Client } = require("klasa");
const { options, config } = require("../../config");

require('../prototypes/Array.prototype');
require('../prototypes/Number.prototype');
require('../prototypes/String.prototype');

const permissionLevels = require('./permissionLevels');
options.permissionLevels = permissionLevels;
Client.defaultGuildSchema
    .add('prefix', 'string', { min: 1, max: 10, filter: (value) => value.length >= 1 && value.length <= 10 });

class GideonClient extends Client {
    constructor() {
        super(options);

        this.config = config;
    }
}
module.exports = GideonClient;