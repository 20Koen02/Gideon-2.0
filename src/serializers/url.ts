import { Serializer, SchemaPiece } from "klasa";
import { Guild } from "discord.js";
import { parse } from "url";

export default class extends Serializer {

	async deserialize(data:any, entry:SchemaPiece, language:any, guild:Guild) {
		const url = parse(data);
		if (url.protocol && url.hostname) return data;
		throw guild.i18n.get("resolver_invalid_url", { name: entry.key 	});
	}

};
