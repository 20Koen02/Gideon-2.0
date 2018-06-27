const Event = require("../structures/Event.js");
module.exports = class extends Event {

    async run() {
        if(this.client.users.get("1")) this.client.users.delete("1");
        this.client.appInfo = await this.client.fetchApplication();

        setInterval(async () => {
            this.client.appInfo = await this.client.fetchApplication();
        }, 60000);

        this.client.user.setActivity(`@${this.client.user.username} help`);

        this.client.console.log(`${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`);
            //require('../util/dashboard.js')(this.client);
    }
};
