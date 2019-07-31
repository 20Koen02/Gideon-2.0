import { Serializer, SchemaPiece } from "klasa";
import { Guild } from "discord.js";

module.exports = class extends Serializer {

	async deserialize(data:any, entry:SchemaPiece, language:any, guild:Guild) {
		let user = this.client.users.resolve(data);
		if (user) return user;
		if (Serializer.regex.userOrMember.test(data)) user = await this.client.users.fetch(Serializer.regex.userOrMember.exec(data)[1]).catch(() => null);
		if (user) return user;
		throw guild.i18n.get("resolver_invalid_user", { name: entry.key });
	}

	serialize(value:any) {
		return value.id;
	}

	stringify(value:any) {
		return (this.client.users.get(value) || { username: (value && value.username) || value }).username;
	}

};
