const { Client } = require("klasa");
const Trello = require("trello");
const { options, config, keys } = require("../../config");
const Miscs = require("../Miscs");
const API = require("../API");

// Guild extension, for adding music library as a property to guild object.
require("../extentions/guildExtention");

require("../prototypes/Array.prototype");
require("../prototypes/Number.prototype");
require("../prototypes/String.prototype");

const permissionLevels = require("./permissionLevels");
options.permissionLevels = permissionLevels;
Client.defaultGuildSchema
    .add("prefix", "string", { min: 1, max: 10, filter: value => value.length >= 1 && value.length <= 10 })
    .add("appearance", folder => folder.add("embedcolor", "string"))
    .add("antiinvite", folder =>
        folder.add("enabled", "boolean", { default: false }).add("exception", "TextChannel", { array: true })
    )
    .add("roles", folder => folder.add("dj", "Role"));

class GideonClient extends Client {
    constructor() {
        super(options);

        this.config = config;

        this.helpers = {
            Miscs: new Miscs(this),
            API: new API(this)
        };
        this.trello = new Trello(keys.trello.key, keys.trello.token);
    }
}
module.exports = GideonClient;
