import { Serializer, SchemaPiece } from "klasa";
import { Guild, Role } from "discord.js";

export default class extends Serializer {

	async deserialize(data:any, entry:SchemaPiece, language:any, guild:Guild) {
		if (!guild) throw this.client.languages.default.get("resolver_invalid_guild", entry.key);
		if (data instanceof Role) return data;
		const role = Serializer.regex.role.test(data) ? guild.roles.get(Serializer.regex.role.exec(data)[1]) : guild.roles.find(rol => rol.name === data) || null;
		if (role) return role;
		throw guild.i18n.get("resolver_invalid_role", { name: entry.key });
	}

	serialize(value:any) {
		return value.id;
	}

};
