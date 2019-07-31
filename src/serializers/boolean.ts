import { Serializer, SerializerOptions, SchemaPiece } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { Guild } from "discord.js";
const truths = ["1", "true", "+", "t", "yes", "y"];
const falses = ["0", "false", "-", "f", "no", "n"];

@applyOptions<SerializerOptions>({
	aliases: ["bool"]
})

export default class extends Serializer {

	async deserialize(data:any, entry:SchemaPiece, language:any, guild:Guild) {
		const boolean = String(data).toLowerCase();
		if (truths.includes(boolean)) return true;
		if (falses.includes(boolean)) return false;
		throw guild.i18n.get("resolver_invalid_bool", { name: entry.key });
	}

	stringify(value:any) {
		return value ? "Enabled" : "Disabled";
	}

};
