const { Client } = require("klasa");
const { options, config } = require("../../config");

require('../prototypes/Array.prototype');
require('../prototypes/Number.prototype');
require('../prototypes/String.prototype');

const permissionLevels = require('./permissionLevels');
options.permissionLevels = permissionLevels;

class GideonClient extends Client {
    constructor() {
        super(options);

        this.config = config;
    }
}
module.exports = GideonClient;