const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: 'guilds/:guildID/music/add' });
	}

	async post(req, res) {
        const { guildID } = req.params;
        const { userid, songid } = req.body;
        if(!userid || !songid) return res.end('{}');
        const guild = this.client.guilds.get(guildID);
        const user = this.client.users.get(userid);
        if(!guild) return res.end('{}');
        const { music } = guild;
        const addedSong = await music.add(user, songid, { force: true }); 
        return res.end(JSON.stringify(addedSong));
	}
};