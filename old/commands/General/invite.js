const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            guarded: true,
            description: language => language.get("COMMAND_INVITE_DESCRIPTION")
        });
    }

    async run(message) {
        return message.send(message.language.get("COMMAND_INVITE", this.client.invite));
    }

    async init() {
        if (this.client.application && !this.client.application.botPublic) this.permissionLevel = 10;
    }
};