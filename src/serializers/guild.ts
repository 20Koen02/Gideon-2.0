import { Serializer, SchemaPiece } from "klasa";
import { Guild } from "discord.js";
export default class extends Serializer {

	async deserialize(data:any, entry:SchemaPiece, language:any, g:Guild) {
		if (data instanceof Guild) return data;
		const guild = Serializer.regex.channel.test(data) ? this.client.guilds.get(data) : null;
		if (guild) return guild;
		throw g.i18n.get("resolver_invalid_guild", { name: entry.key });
	}

	serialize(value:any) {
		return value.id;
	}

	stringify(value:any) {
		return (this.client.guilds.get(value) || { name: value }).name;
	}

};
