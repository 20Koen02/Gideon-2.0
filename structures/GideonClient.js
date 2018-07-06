const { Client, Util, Permissions } = require("discord.js");
const CommandStore = require("./CommandStore.js");
const EventStore = require("./EventStore.js");
const LanguageStore = require("./LanguageStore.js");
const MonitorStore = require("./MonitorStore.js");
const GideonConsole = require("./GideonConsole.js");
const settingsHandler = require(`${process.cwd()}/util/settingsHandler.js`);

// Lib
const Miscs = require('../lib/Miscs');
const API = require('../lib/API');

class GideonClient extends Client {
    constructor(options) {
        super(options);

        this.config = require("../config.js");
        this.console = new GideonConsole(this);
        this.commands = new CommandStore(this);
        this.events = new EventStore(this);
        this.languages = new LanguageStore(this);
        this.monitors = new MonitorStore(this);
        this.levelCache = {};
        this.methods = {
            util: require("../util/util.js"),
            errors: require("../util/CustomError")
        };

        this.helper = { // eslint-disable-line
            Miscs: new Miscs(this),
            API: new API(this),
            Util: Util
        };
        this.db = new settingsHandler(this);
        this.ready = false;
        this.on("ready", this._ready.bind(this));
    }

    async login(token) {
        await this.init();
        return super.login(token);
    }

    _ready() {
        this.ready = true;
        this.emit("gideonReady");
    }

    get ping() {
        return this.pings.reduce((prev, p) => prev + p, 0) / this.pings.length;
    }

    get status() {
        return this.ws.connection ? this.ws.connection.status : null;
    }
    generateInvite() {
		const permissions = Permissions.resolve(this.commands.reduce((a, b) => a.add(b.botPerms), new Permissions(['VIEW_CHANNEL', 'SEND_MESSAGES'])));
		return `https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&permissions=${permissions}&scope=bot`;
	}

    permlevel(message) {
        let permlvl = 0;

        const permOrder = this.config.permLevels.slice(0).sort((prev, val) => prev.level < val.level ? 1 : -1);

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    }


    async init() {
        const [commands, events, languages, monitors] = await Promise.all([this.commands.loadFiles(), this.events.loadFiles(), this.languages.loadFiles(), this.monitors.loadFiles()]);
        this.console.log(`Loaded a total of ${commands} commands`);
        this.console.log(`Loaded a total of ${events} events`);
        this.console.log(`Loaded a total of ${languages} languages`);
        this.console.log(`Loaded a total of ${monitors} monitors`);

        for (let i = 0; i < this.config.permLevels.length; i++) {
            const thisLevel = this.config.permLevels[i];
            this.levelCache[thisLevel.name] = thisLevel.level;
        }
    }
}

module.exports = GideonClient;
